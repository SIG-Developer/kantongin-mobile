import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 48,
    backgroundColor: '#f55e5e',
  },
  msgText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '1rem',
  }
});

export default class Offline extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.msgText}>
          You are offline
        </Text>
      </View>
    );
  }
}
