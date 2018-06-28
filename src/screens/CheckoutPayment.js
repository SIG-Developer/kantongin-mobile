import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Import actions.
import * as ordersActions from '../actions/ordersActions';
import * as cartActions from '../actions/cartActions';
import * as paymentsActions from '../actions/paymentsActions';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import CartFooter from '../components/CartFooter';
import FormBlock from '../components/FormBlock';
import PaymentPhoneForm from '../components/PaymentPhoneForm';
import PaymentCreditCardForm from '../components/PaymentCreditCardForm';
import PaymentCheckForm from '../components/PaymentCheckForm';
import PaymentPaypalForm from '../components/PaymentPaypalForm';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';
import { stripTags, formatPrice } from '../utils';
import i18n from '../utils/i18n';

// theme
import theme from '../config/theme';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  paymentItemWrapper: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 10,
  },
  paymentItem: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  paymentItemText: {
    fontSize: '0.9rem',
  },
  paymentItemDesc: {
    fontSize: '0.8rem',
    paddingBottom: 6,
    color: 'gray',
    marginTop: 10,
  },
  uncheckIcon: {
    fontSize: '1rem',
    marginRight: 6,
  },
  checkIcon: {
    fontSize: '1rem',
    marginRight: 6,
  },
  stepsWrapper: {
    padding: 14,
  },
});

const PAYMENT_CREDIT_CARD = 'views/orders/components/payments/cc.tpl';
const PAYMENT_CHECK = 'views/orders/components/payments/check.tpl';
const PAYMENT_PAYPAL_EXPRESS = 'addons/paypal/views/orders/components/payments/paypal_express.tpl';
const PAYMENT_PHONE = 'views/orders/components/payments/phone.tpl';

class CheckoutStepThree extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    cartActions: PropTypes.shape({
      clear: PropTypes.func,
    }),
    paymentsActions: PropTypes.shape({
      paypalSettlements: PropTypes.func,
    }),
    ordersActions: PropTypes.shape({
      create: PropTypes.func,
    }),
    shipping_id: PropTypes.shape(),
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }),
    total: PropTypes.number,
  };

  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
    navBarButtonFontSize: theme.$navBarButtonFontSize,
    navBarTextColor: theme.$navBarTextColor,
    screenBackgroundColor: theme.$screenBackgroundColor,
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      selectedItem: null,
      total: 0,
      items: [],
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    const items = Object.keys(cart.payments).map(k => cart.payments[k]);
    // FIXME: Default selected payment method.
    const selectedItem = items[1];

    this.setState({
      items,
      selectedItem,
      total: this.props.total,
    });
  }

  handlePlaceOrder() {
    const { selectedItem } = this.state;
    if (!selectedItem) {
      return null;
    }

    this.setState({
      fetching: true,
    });

    if (selectedItem.template === PAYMENT_PAYPAL_EXPRESS) {
      return this.placePayPalOrder();
    }
    return this.placeOrderAndComplete();
  }

  placeOrderAndComplete() {
    const {
      cart, shipping_id, ordersActions, navigator, cartActions
    } = this.props;
    const values = this.paymentFormRef.getValue();
    if (!values) {
      return null;
    }
    const orderInfo = {
      products: {},
      shipping_id,
      payment_id: this.state.selectedItem.payment_id,
      user_data: cart.user_data,
      ...values,
    };
    Object.keys(cart.products).map((key) => {
      const p = cart.products[key];
      orderInfo.products[p.product_id] = {
        product_id: p.product_id,
        amount: p.amount,
      };
      return orderInfo;
    });
    ordersActions.create(orderInfo, (orderId) => {
      this.setState({
        fetching: false,
      });
      cartActions.clear();
      navigator.push({
        screen: 'CheckoutComplete',
        backButtonTitle: '',
        backButtonHidden: true,
        passProps: {
          orderId: orderId.order_id,
        }
      });
    });
    return null;
  }

  placePayPalOrder() {
    const {
      cart, shipping_id, ordersActions, navigator, paymentsActions
    } = this.props;
    const orderInfo = {
      products: {},
      shipping_id,
      payment_id: this.state.selectedItem.payment_id,
      user_data: cart.user_data,
    };
    Object.keys(cart.products).map((key) => {
      const p = cart.products[key];
      orderInfo.products[p.product_id] = {
        product_id: p.product_id,
        amount: p.amount,
      };
      return orderInfo;
    });
    ordersActions.create(orderInfo, (orderId) => {
      this.setState({
        fetching: false,
      });
      paymentsActions.paypalSettlements(orderId.order_id, false, (data) => {
        navigator.push({
          screen: 'PayPalCompleteWebView',
          backButtonTitle: '',
          // backButtonHidden: true,
          passProps: {
            orderId: orderId.order_id,
            ...data.data,
          },
        });
      });
    });
    return null;
  }

  renderItem = (item) => {
    // FIXME compare by name.
    const isSelected = item.payment === this.state.selectedItem.payment;
    return (
      <TouchableOpacity
        style={styles.paymentItem}
        onPress={() => {
          this.setState({
            selectedItem: item,
          }, () => {
            this.listView.scrollToOffset({ x: 0, y: 0, animated: true });
          });
        }}
      >
        {isSelected ?
          <Icon name="radio-button-checked" style={styles.checkIcon} /> :
          <Icon name="radio-button-unchecked" style={styles.uncheckIcon} />
        }
        <Text style={styles.paymentItemText}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.stepsWrapper}>
        <CheckoutSteps step={3} />
      </View>
    );
  }

  renderFooter() {
    const { selectedItem } = this.state;
    if (!selectedItem) {
      return null;
    }
    let form = null;
    // FIXME: HARDCOD
    switch (selectedItem.template) {
      case PAYMENT_CREDIT_CARD:
        form = (
          <PaymentCreditCardForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;
      case PAYMENT_CHECK:
        form = (
          <PaymentCheckForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;
      case PAYMENT_PAYPAL_EXPRESS:
        form = (
          <PaymentPaypalForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;
      case PAYMENT_PHONE:
        form = (
          <PaymentPhoneForm
            onInit={(ref) => {
              this.paymentFormRef = ref;
            }}
          />
        );
        break;

      default:
        break;
    }

    return (
      <View style={styles.paymentItemWrapper}>
        <FormBlock
          title={selectedItem.payment}
        >
          {form}
          <Text style={styles.paymentItemDesc}>
            {stripTags(selectedItem.instructions)}
          </Text>
        </FormBlock>
      </View>
    );
  }

  renderSpinner = () => {
    const { fetching } = this.state;
    return (
      <Spinner visible={fetching} />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <FlatList
            ref={(ref) => { this.listView = ref; }}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => this.renderFooter()}
            data={this.state.items}
            keyExtractor={(item, index) => `${index}`}
            numColumns={1}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </KeyboardAwareScrollView>
        <CartFooter
          totalPrice={formatPrice(this.state.total)}
          btnText={i18n.gettext('Place order').toUpperCase()}
          isBtnDisabled={false}
          onBtnPress={() => this.handlePlaceOrder()}
        />
        {this.renderSpinner()}
      </View>
    );
  }
}

export default connect(
  state => ({
    cart: state.cart,
    auth: state.auth,
  }),
  dispatch => ({
    ordersActions: bindActionCreators(ordersActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    paymentsActions: bindActionCreators(paymentsActions, dispatch),
  })
)(CheckoutStepThree);
