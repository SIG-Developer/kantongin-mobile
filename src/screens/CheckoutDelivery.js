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

// Import components
import CheckoutSteps from '../components/CheckoutSteps';
import FormBlockField from '../components/FormBlockField';
import FormBlock from '../components/FormBlock';
import CartFooter from '../components/CartFooter';

// Import actions.
import * as authActions from '../actions/authActions';
import * as cartActions from '../actions/cartActions';

import i18n from '../utils/i18n';
import { getCountries, getStates, formatPrice } from '../utils';

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

const cachedCountries = getCountries();
const Form = t.form.Form;
const Country = t.enums(cachedCountries);

const billingFields = {
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
};
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
    },
    b_zipcode: {
      label: 'Zip code',
      keyboardType: 'numeric',
      clearButtonMode: 'while-editing',
    },
  }
};

const shippingFields = {
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
};
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
    s_country: {
      label: 'Country',
    },
    s_state: {
      label: 'State',
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

  constructor(props) {
    super(props);
    this.isFirstLoad = true;
    this.state = {
      fetching: false,
      billingFormFields: t.struct({
        ...billingFields,
      }),
      shippingFormFields: t.struct({
        ...shippingFields,
      }),
      billingValues: {},
      shippingValues: {},
    };
  }

  componentDidMount() {
    const { navigator, auth } = this.props;

    navigator.setTitle({
      title: i18n.gettext('Checkout').toUpperCase(),
    });
    this.props.cartActions.getUserData(auth.token);
  }

  componentWillReceiveProps(nextProps) {
    const { cart } = nextProps;
    this.setState({
      billingValues: {
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
      shippingValues: {
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
    }, () => {
      if (this.isFirstLoad) {
        this.isFirstLoad = false;
        this.handleChange(this.state.billingValues, 'billing');
        this.handleChange(this.state.shippingValues, 'shipping');
      }
    });
  }

  handleChange = (value, type) => {
    if (type === 'billing') {
      const bState = getStates(value.b_country);
      if (bState) {
        this.setState({
          billingFormFields: t.struct({
            ...billingFields,
            b_state: t.enums(bState),
          }),
          billingValues: {
            ...value,
          },
        });
      } else {
        this.setState({
          billingFormFields: t.struct({
            ...billingFields,
          }),
          billingValues: {
            ...value,
            b_state: '',
          }
        });
      }
    } else if (type === 'shipping') {
      const sState = getStates(value.s_country);
      if (sState) {
        this.setState({
          shippingFormFields: t.struct({
            ...shippingFields,
            s_state: t.enums(sState),
          }),
          shippingValues: {
            ...value,
          },
        });
      } else {
        this.setState({
          shippingFormFields: t.struct({
            ...shippingFields,
          }),
          shippingValues: {
            ...value,
            s_state: '',
          }
        });
      }
    }
  }

  handleNextPress() {
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
      this.props.navigator.push({
        screen: 'CheckoutShipping',
        backButtonTitle: '',
        title: i18n.gettext('Checkout').toUpperCase(),
        passProps: {
          total: this.props.cart.total,
        },
      });
    }
  }

  render() {
    const { cart } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
          <CheckoutSteps step={1} />
          <FormBlock
            title={i18n.gettext('Billing address')}
          >
            <Form
              ref={'checkoutBilling'}
              type={this.state.billingFormFields}
              value={this.state.billingValues}
              onChange={values => this.handleChange(values, 'billing')}
              options={BillingOptions}
            />
          </FormBlock>

          <FormBlock
            title={i18n.gettext('Shipping address')}
            buttonText={i18n.gettext('Change address')}
            simpleView={
              <View>
                <FormBlockField title={i18n.gettext('First name:')}>
                  {this.state.shippingValues.s_firstname}
                </FormBlockField>
                <FormBlockField title={i18n.gettext('Last name:')}>
                  {this.state.shippingValues.s_lastname}
                </FormBlockField>
              </View>
            }
          >
            <Form
              ref={'checkoutShipping'}
              type={this.state.shippingFormFields}
              value={this.state.shippingValues}
              onChange={values => this.handleChange(values, 'shipping')}
              options={ShippingOptions}
            />
          </FormBlock>

        </ScrollView>
        <CartFooter
          totalPrice={formatPrice(cart.subtotal)}
          btnText={i18n.gettext('Next').toUpperCase()}
          onBtnPress={() => this.handleNextPress()}
        />
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
