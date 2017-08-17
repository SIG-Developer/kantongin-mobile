import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as t from 'tcomb-form-native';

// Import components
import CheckoutSteps from '../components/CheckoutSteps';
import FormBlockField from '../components/FormBlockField';
import FormBlock from '../components/FormBlock';

// Import actions.
import * as authActions from '../actions/authActions';
import * as cartActions from '../actions/cartActions';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
    marginBottom: 130,
  },
});

const Form = t.form.Form;
const Country = t.enums({
  AF: 'Afghanistan',
  AL: 'Aland Islands',
  ALB: 'Albania',
  US: 'United States',
});

const BillingFormFields = t.struct({
  b_firstname: t.String,
  b_lastname: t.String,
  email: t.String,
  phone: t.maybe(t.String),
  b_address: t.String,
  b_address_2: t.maybe(t.String),
  b_city: t.String,
  b_country: Country,
  b_state: t.String,
  b_zipcode: t.String,
});
const BillingOptions = {
  disableOrder: true,
  fields: {
    b_firstname: {
      label: 'First name',
      clearButtonMode: 'while-editing',
    },
    b_lastname: {
      label: 'Last name',
      clearButtonMode: 'while-editing',
    },
    email: {
      label: 'E-mail',
      keyboardType: 'email-address',
      clearButtonMode: 'while-editing',
    },
    phone: {
      label: 'Phone',
      keyboardType: 'phone-pad',
      clearButtonMode: 'while-editing',
    },
    b_address: {
      label: 'Address',
      multiline: true,
      numberOfLines: 4,
      clearButtonMode: 'while-editing',
    },
    b_address_2: {
      label: 'Address 2',
      multiline: true,
      numberOfLines: 4,
      clearButtonMode: 'while-editing',
    },
    b_city: {
      label: 'City',
      clearButtonMode: 'while-editing',
    },
    b_country: {
      label: 'Country',
    },
    b_state: {
      label: 'State',
      clearButtonMode: 'while-editing',
    },
    b_zipcode: {
      label: 'Zip code',
      keyboardType: 'numeric',
      clearButtonMode: 'while-editing',
    },
  }
};

const ShippingFormFields = t.struct({
  s_firstname: t.String,
  s_lastname: t.String,
  email: t.String,
  phone: t.maybe(t.String),
  s_address: t.String,
  s_address_2: t.maybe(t.String),
  s_city: t.String,
  s_country: Country,
  s_state: t.String,
  s_zipcode: t.String,
});
const ShippingOptions = {
  disableOrder: true,
  fields: {
    s_firstname: {
      label: 'First name',
      clearButtonMode: 'while-editing',
    },
    s_lastname: {
      label: 'Last name',
      clearButtonMode: 'while-editing',
    },
    email: {
      label: 'E-mail',
      keyboardType: 'email-address',
      clearButtonMode: 'while-editing',
    },
    phone: {
      label: 'Phone',
      keyboardType: 'phone-pad',
      clearButtonMode: 'while-editing',
    },
    s_address: {
      label: 'Address',
      multiline: true,
      numberOfLines: 4,
      clearButtonMode: 'while-editing',
    },
    s_address_2: {
      label: 'Address 2',
      multiline: true,
      numberOfLines: 4,
      clearButtonMode: 'while-editing',
    },
    s_city: {
      label: 'City',
      clearButtonMode: 'while-editing',
    },
    b_country: {
      label: 'Country',
    },
    s_state: {
      label: 'State',
      clearButtonMode: 'while-editing',
    },
    s_zipcode: {
      label: 'Zip code',
      keyboardType: 'numeric',
      clearButtonMode: 'while-editing',
    },
  }
};

class Checkout extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      pop: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
    auth: PropTypes.shape(),
    cart: PropTypes.shape(),
    cartActions: PropTypes.shape({
      getUserData: PropTypes.func,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      billing: {},
      shipping: {},
    };
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    const { navigator, auth } = this.props;

    navigator.setTitle({
      title: i18n.gettext('Checkout').toUpperCase(),
    });
    navigator.setButtons({
      rightButtons: [
        {
          title: i18n.gettext('Next'),
          id: 'next',
          buttonColor: '#FD542A',
          buttonFontWeight: '600',
          buttonFontSize: 16,
        },
      ],
    });
    this.props.cartActions.getUserData(auth.token);
  }

  componentWillReceiveProps(nextProps) {
    const { cart } = nextProps;
    this.setState({
      billing: {
        b_firstname: cart.user_data.b_firstname,
        b_lastname: cart.user_data.b_lastname,
        email: cart.user_data.email,
        phone: cart.user_data.phone,
        b_address: cart.user_data.b_address,
        b_address_2: cart.user_data.b_address_2,
        b_city: cart.user_data.b_city,
        b_country: cart.user_data.b_country,
        b_state: cart.user_data.b_state,
        b_zipcode: cart.user_data.b_zipcode,
      },
      shipping: {
        s_firstname: cart.user_data.s_firstname,
        s_lastname: cart.user_data.s_lastname,
        email: cart.user_data.email,
        phone: cart.user_data.phone,
        s_address: cart.user_data.s_address,
        s_address_2: cart.user_data.s_address_2,
        s_city: cart.user_data.s_city,
        s_country: cart.user_data.s_country,
        s_state: cart.user_data.s_state,
        s_zipcode: cart.user_data.s_zipcode,
      },
    });
  }

  onNavigatorEvent(event) {
    const { navigator, cartActions } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'next') {
        let shippingForm = {};
        const billingForm = this.refs.checkoutBilling.getValue();
        if ('shippingForm' in this.refs) {
          shippingForm = this.refs.checkoutShipping.getValue();
        }
        if (billingForm && shippingForm) {
          cartActions.saveUserData({
            ...billingForm,
            ...shippingForm,
          });
          navigator.push({
            screen: 'CheckoutShipping',
            backButtonTitle: '',
            title: i18n.gettext('Checkout').toUpperCase(),
          });
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={50}
        >
          <ScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <CheckoutSteps step={1} />
            <FormBlock
              title={i18n.gettext('Billing address')}
            >
              <Form
                ref={'checkoutBilling'}
                type={BillingFormFields}
                value={this.state.billing}
                options={BillingOptions}
              />
            </FormBlock>

            <FormBlock
              title={i18n.gettext('Shipping address')}
              buttonText={i18n.gettext('Change address')}
              simpleView={
                <View>
                  <FormBlockField title={i18n.gettext('First name:')}>
                    {this.state.shipping.s_firstname}
                  </FormBlockField>
                  <FormBlockField title={i18n.gettext('Last name:')}>
                    {this.state.shipping.s_lastname}
                  </FormBlockField>
                </View>
              }
            >
              <Form
                ref={'checkoutShipping'}
                type={ShippingFormFields}
                value={this.state.shipping}
                options={ShippingOptions}
              />
            </FormBlock>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  cart: state.cart,
}),
dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  cartActions: bindActionCreators(cartActions, dispatch),
})
)(Checkout);
