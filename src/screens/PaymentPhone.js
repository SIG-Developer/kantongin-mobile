import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as t from 'tcomb-form-native';

// Import actions.
import * as ordersActions from '../actions/ordersActions';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import FormBlock from '../components/FormBlock';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
});

const Form = t.form.Form;
const PhoneFormFields = t.struct({
  phone: t.String,
  comment: t.maybe(t.String),
});
const PhoneFormOptions = {
  disableOrder: true,
  fields: {
    phone: {
      label: i18n.gettext('Phone'),
      clearButtonMode: 'while-editing',
      keyboardType: 'phone-pad',
    },
    comment: {
      label: i18n.gettext('Comment'),
      clearButtonMode: 'while-editing',
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150
          }
        }
      }
    },
  }
};

class PaymentPhone extends Component {
  static propTypes = {
    ordersActions: PropTypes.shape({
      create: PropTypes.func,
    }),
    cart: PropTypes.shape(),
    shipping_id: PropTypes.string,
    payment_id: PropTypes.string,
    auth: PropTypes.shape({
      token: PropTypes.string,
    }),
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setTitle: PropTypes.func,
      setButtons: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
    };
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.navigator.setTitle({
      title: i18n.gettext('Checkout').toUpperCase(),
    });
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: i18n.gettext('Place order'),
          id: 'placeOrder',
          buttonColor: '#FD542A',
          buttonFontWeight: '600',
          buttonFontSize: 16,
        },
      ],
    });
  }

  onNavigatorEvent(event) {
    const { auth, cart, shipping_id, payment_id, ordersActions } = this.props;
    if (event.type === 'NavBarButtonPress') {
      const formValues = this.refs.paymentPhone.getValue();
      if (formValues) {
        const orderInfo = {
          products: {},
          shipping_id,
          payment_id,
          // user_data: cart.user_data,
        };
        Object.keys(cart.products).map((key) => {
          const p = cart.products[key];
          orderInfo.products[p.product_id] = {
            product_id: p.product_id,
            amount: p.amount,
          };
        });
        ordersActions.create(formValues, auth.token);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
          <CheckoutSteps step={3} />
          <FormBlock
            title={i18n.gettext('Phone ordering')}
          >
            <Form
              ref={'paymentPhone'}
              type={PhoneFormFields}
              options={PhoneFormOptions}
            />
          </FormBlock>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  cart: state.cart,
  orders: state.orders,
}),
dispatch => ({
  ordersActions: bindActionCreators(ordersActions, dispatch),
})
)(PaymentPhone);
