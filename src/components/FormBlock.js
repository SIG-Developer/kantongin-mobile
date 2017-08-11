import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    margin: 0,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  header: {
    marginBottom: 14,
    fontWeight: 'bold',
    fontSize: '0.9rem',
  }
});

export default class FormBlock extends Component {
  static propTypes = {
    children: PropTypes.shape(),
  }

  renderTitle() {
    if (!this.props.title) {
      return null;
    }

    return (
      <Text style={styles.header}>
        {this.props.title.toUpperCase()}
      </Text>
    );
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        {this.renderTitle()}
        {this.props.children}
      </View>
    );
  }
}
