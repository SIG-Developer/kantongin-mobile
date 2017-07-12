import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as t from 'tcomb-form-native';

// Import actions.
import * as authActions from '../actions/authActions';
import * as flashActions from '../actions/flashActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 14,
  },
  btn: {
    backgroundColor: '#4fbe31',
    padding: 12,
    borderRadius: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
  },
});

const Form = t.form.Form;
const Country = t.enums({
  AF: 'Afghanistan',
  AL: 'Aland Islands',
  ALB: 'Albania',
});
const FormFields = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  phone: t.maybe(t.String),
  address: t.String,
  city: t.String,
  country: Country,
  state: t.String,
  zupCode: t.String,
});
const options = {
  disableOrder: true,
  fields: {
    firstName: {
      label: 'First name',
      clearButtonMode: 'while-editing',
    },
    lastName: {
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
    address: {
      label: 'Address',
      multiline: true,
      numberOfLines: 4,
      clearButtonMode: 'while-editing',
    },
    city: {
      label: 'City',
      clearButtonMode: 'while-editing',
    },
    state: {
      label: 'State',
      clearButtonMode: 'while-editing',
    },
    zipCode: {
      label: 'Zip code',
      keyboardType: 'numeric',
      clearButtonMode: 'while-editing',
    },
  }
};


class Checkout extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      values: {
        country: 'AF',
      }
    };
  }

  componentDidMount() {
  }

  handleLogin() {
    const { navigation } = this.props;
    const value = this.refs.checkoutForm.getValue();
    navigation.navigate('CheckoutStepTwo', {
      ...navigation.state.params,
      user_data: {},
    });
    if (value) {
      navigation.navigate('CheckoutStepTwo', { data: value });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
        >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Form
              ref={'checkoutForm'}
              type={FormFields}
              value={this.state.values}
              options={options}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.handleLogin()}
            >
              <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

Checkout.navigationOptions = () => {
  return {
    title: 'Billing and Shipping Address'.toUpperCase(),
  };
};

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  flash: state.flash,
}),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch),
  })
)(Checkout);
