import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as notificationsActions from '../actions/notificationsActions';

// Components
import FormBlock from '../components/FormBlock';
import FormBlockField from '../components/FormBlockField';
import Spinner from '../components/Spinner';

import i18n from '../utils/i18n';
import { getCountryByCode, formatPrice, getImagePath } from '../utils';
import Api from '../services/api';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
  mainHeader: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  formBlockWraper: {
    marginTop: 14,
  },
  subHeader: {
    fontSize: '0.8rem',
    color: '#7C7C7C',
    marginBottom: 24,
  },
  header: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  date: {
    fontSize: '0.7rem',
    color: '#7C7C7C',
  },
  flexWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productsWrapper: {
    marginTop: 14,
  },
  productItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
  productItemImage: {
    width: 100,
    height: 100,
  },
  productItemDetail: {
    marginLeft: 14,
    width: '70%',
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
  },
});

class OrderDetail extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: '#989898',
  };

  static propTypes = {
    notificationsActions: PropTypes.shape({
      show: PropTypes.func,
    }),
    orderId: PropTypes.string,
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setTitle: PropTypes.func,
      setButtons: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      orderDetail: {},
    };
  }

  componentWillMount() {
    const { orderId, navigator, notificationsActions } = this.props;
    Api.get(`/sra_orders/${orderId}`)
      .then((response) => {
        this.setState({
          fetching: false,
          orderDetail: response.data,
        });
      })
      .catch(() => {
        notificationsActions.show({
          type: 'info',
          title: i18n.gettext('Information'),
          text: i18n.gettext('Order not found.'),
          closeLastModal: false,
        });
        setTimeout(() => {
          navigator.resetTo({
            screen: 'Layouts',
            animated: false,
          });
        });
      });

    navigator.setTitle({
      title: i18n.gettext('Order Detail').toUpperCase(),
    });
  }

  renderProduct = (item, index) => {
    let productImage = null;
    const imageUri = getImagePath(item);
    if (imageUri) {
      productImage = (
        <Image
          source={{ uri: imageUri }}
          style={styles.productItemImage}
        />);
    }
    return (
      <View style={styles.productItem} key={index}>
        {productImage}
        <View style={styles.productItemDetail}>
          <Text
            style={styles.productItemName}
            numberOfLines={1}
          >
            {item.product}
          </Text>
          <Text style={styles.productItemPrice}>
            {`${item.amount} x ${formatPrice(item.price_formatted.price)}`}
          </Text>
        </View>
      </View>
    );
  }

  renderBilling() {
    const { orderDetail } = this.state;
    const foundCountry = {
      name: orderDetail.b_country,
      states: [],
      ...getCountryByCode(orderDetail.b_country),
    };
    const state = foundCountry.states.filter(s => s.code === orderDetail.b_state);
    let foundState = {
      name: orderDetail.b_state,
    };

    if (state.length) {
      foundState = {
        ...foundState,
        ...state[0],
      };
    }

    return (
      <FormBlock
        title={i18n.gettext('Billing address')}
        buttonText={i18n.gettext('Show all').toUpperCase()}
        noContainerStyle
        simpleView={
          (
            <View>
              <FormBlockField title={`${i18n.gettext('First name')}:`}>
                {orderDetail.b_firstname}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Last name')}:`}>
                {orderDetail.b_lastname}
              </FormBlockField>
            </View>
          )
        }
      >
        <View>
          <FormBlockField title={`${i18n.gettext('First name')}:`}>
            {orderDetail.b_firstname}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Last name')}:`}>
            {orderDetail.b_lastname}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('E-mail')}:`}>
            {orderDetail.email}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Phone')}:`}>
            {orderDetail.b_phone}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Address')}:`}>
            {orderDetail.b_address} {orderDetail.b_address2}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('City')}:`}>
            {orderDetail.b_city}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Country')}:`}>
            {foundCountry.name}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('State')}:`}>
            {foundState.name}
          </FormBlockField>
        </View>
      </FormBlock>
    );
  }

  renderShipping() {
    const { orderDetail } = this.state;
    const foundCountry = {
      name: orderDetail.s_country,
      states: [],
      ...getCountryByCode(orderDetail.s_country),
    };
    const state = foundCountry.states.filter(s => s.code === orderDetail.s_state);
    let foundState = {
      name: orderDetail.s_state,
    };
    if (state.length) {
      foundState = {
        ...foundState,
        ...state[0],
      };
    }

    return (
      <FormBlock
        title={i18n.gettext('Shipping address')}
        buttonText={i18n.gettext('Show all').toUpperCase()}
        noContainerStyle
        simpleView={
          (
            <View>
              <FormBlockField title={`${i18n.gettext('First name')}:`}>
                {orderDetail.s_firstname}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Last name')}:`}>
                {orderDetail.s_lastname}
              </FormBlockField>
            </View>
          )
        }
      >
        <View>
          <FormBlockField title={`${i18n.gettext('First name')}:`}>
            {orderDetail.s_firstname}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Last name')}:`}>
            {orderDetail.s_lastname}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('E-mail')}:`}>
            {orderDetail.email}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Phone')}:`}>
            {orderDetail.s_phone}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Address')}:`}>
            {orderDetail.s_address} {orderDetail.s_address2}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('City')}:`}>
            {orderDetail.s_city}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('Country')}:`}>
            {foundCountry.name}
          </FormBlockField>
          <FormBlockField title={`${i18n.gettext('State')}:`}>
            {foundState.name}
          </FormBlockField>
        </View>
      </FormBlock>
    );
  }

  render() {
    const { orderDetail } = this.state;
    if (this.state.fetching) {
      return (
        <View style={styles.container}>
          <Spinner visible mode="content" />
        </View>
      );
    }

    const productsList = orderDetail.product_groups.map((group) => {
      const products = Object.keys(group.products).map(k => group.products[k]);
      return products.map((p, i) => this.renderProduct(p, i));
    });

    const shippingMethodsList = orderDetail.shipping
      .map((s, index) => <Text key={index}>{s.shipping}</Text>);

    const date = new Date(orderDetail.timestamp * 1000);
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.mainHeader}>
            {i18n.gettext('Order')} #{orderDetail.order_id}
          </Text>
          <Text style={styles.subHeader}>
            {i18n.gettext('Placed on')} {format(date, 'MM/DD/YYYY')}
          </Text>

          <FormBlock>
            <Text style={styles.header}>
              {i18n.gettext('Products information').toUpperCase()}
            </Text>
            <View style={styles.productsWrapper}>
              {productsList}
            </View>
          </FormBlock>

          <FormBlock>
            <Text style={styles.header}>
              {i18n.gettext('Summary').toUpperCase()}
            </Text>
            <View style={styles.formBlockWraper}>
              <FormBlockField title={`${i18n.gettext('Payment method')}:`}>
                {orderDetail.payment_method.payment}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Shipping method')}:`}>
                {shippingMethodsList}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Subtotal')}:`}>
                {formatPrice(orderDetail.subtotal_formatted.price)}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Shipping cost')}:`}>
                {formatPrice(orderDetail.shipping_cost_formatted.price)}
              </FormBlockField>
              <FormBlockField title={`${i18n.gettext('Total')}:`}>
                {formatPrice(orderDetail.total_formatted.price)}
              </FormBlockField>
            </View>
          </FormBlock>

          <FormBlock>
            <Text style={styles.header}>
              {i18n.gettext('Products information').toUpperCase()}
            </Text>
            <View style={styles.formBlockWraper}>
              {this.renderBilling()}
            </View>
            <View style={styles.formBlockWraper}>
              {this.renderShipping()}
            </View>
          </FormBlock>
        </ScrollView>
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
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
  })
)(OrderDetail);
