import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as t from 'tcomb-form-native';
import DropdownAlert from 'react-native-dropdownalert';
import EStyleSheet from 'react-native-extended-stylesheet';

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
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
