import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    paddingRight: 4,
    fontSize: '0.9rem',
  },
  gray: {
    color: '#7C7C7C',
    fontSize: '0.9rem',
  },
});

export default class extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
        <Text style={styles.gray}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}
