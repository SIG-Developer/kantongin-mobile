import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#242424',
    borderRadius: 4,
    padding: 14,
    marginTop: 14,
    marginBottom: 14,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '0.9rem',
  }
});

export default class extends PureComponent {
  static propTypes = {
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        {...this.props}
      >
        <Text style={styles.text}>
          {this.props.children.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}
