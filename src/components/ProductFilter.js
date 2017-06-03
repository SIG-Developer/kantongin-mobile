import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import * as t from 'tcomb-form-native';
import DropdownAlert from 'react-native-dropdownalert';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components

const Form = t.form.Form;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 14,
  }
});

const Person = t.struct({
  pname: t.maybe(t.String),
  pshort: t.maybe(t.String),
  pcode: t.maybe(t.String)
});

const options = {
  disableOrder: true,
  fields: {
    pname: {
      label: 'Product name',
      clearButtonMode: 'while-editing',
    },
    pshort: {
      label: 'Product short name',
      clearButtonMode: 'while-editing',
    },
    pcode: {
      label: 'Product code',
      clearButtonMode: 'while-editing',
    }
  }
};

class ProductFilter extends Component {

  onPress() {
    const value = this.refs.form.getValue();
    if (value) {
      this.dropdown.alertWithType('success', 'Success', '');
    }
  }

  onClose() {
    this.props.onClose();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Form
            ref={'form'}
            type={Person}
            options={options}
          />
        </View>
        <DropdownAlert
          ref={(r) => { this.dropdown = r; }}
          onClose={data => this.onClose(data)}
        />
      </View>
    );
  }
}

ProductFilter.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ProductFilter;
