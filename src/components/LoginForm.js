import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    padding: 12,
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
  btnRegistration: {
    marginTop: 20,
  },
  btnRegistrationText: {
    color: 'black',
    fontSize: '1rem',
    textAlign: 'center'
  }
});

const Form = t.form.Form;
const FormFields = t.struct({
  email: t.String,
  password: t.String,
});
const options = {
  disableOrder: true,
  fields: {
    email: {
      label: 'Email',
      keyboardType: 'email-address',
      clearButtonMode: 'while-editing',
    },
    password: {
      label: 'Password',
      secureTextEntry: true,
      clearButtonMode: 'while-editing',
    },
  }
};

export default class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  handleLogin() {
    const value = this.refs.form.getValue();
    if (value) {
      this.props.onSubmit(value);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={'form'}
          type={FormFields}
          options={options}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.handleLogin()}
          disabled={this.props.fetching}
        >
          <Text style={styles.btnText}>
            {i18n.gettext('Login')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnRegistration}
          onPress={() => this.props.navigator.push({
            screen: 'Registration',
            backButtonTitle: '',
          })}
        >
          <Text style={styles.btnRegistrationText}>
            {i18n.gettext('Registration')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
