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
  phone: t.String,
  comment: t.maybe(t.String),
});
const formOptions = {
  disableOrder: true,
  fields: {
    phone: {
      label: i18n.gettext('Phone'),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
      keyboardType: 'phone-pad',
    },
    comment: {
      label: i18n.gettext('Comment'),
      clearButtonMode: 'while-editing',
      returnKeyType: 'done',
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
      },
    },
  }
};

export default class PaymentPhoneForm extends Component {
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
