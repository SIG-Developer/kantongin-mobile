import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as t from 'tcomb-form-native';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 14,
  },
});

const Form = t.form.Form;
const formFields = t.struct({
  customerSignature: t.String,
  checkingAccountNumber: t.String,
  bankRoutingNumber: t.String,
  comment: t.maybe(t.String),
});
const formOptions = {
  disableOrder: true,
  fields: {
    customerSignature: {
      label: i18n.gettext('Customer\'s signature'),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
    },
    checkingAccountNumber: {
      label: i18n.gettext('Checking account number'),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
    },
    bankRoutingNumber: {
      label: i18n.gettext('Bank routing number'),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
    },
    comment: {
      label: i18n.gettext('Comment'),
      clearButtonMode: 'while-editing',
      multiline: true,
      returnKeyType: 'done',
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150
          }
        }
      },
    },
  }
};

export default class PaymentCheckForm extends Component {
  static propTypes = {
    onInit: PropTypes.func,
  };

  componentDidMount() {
    this.props.onInit(this.refs.formRef);
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={'formRef'}
          type={formFields}
          options={formOptions}
        />
      </View>
    );
  }
}
