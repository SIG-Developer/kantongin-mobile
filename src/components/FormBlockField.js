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
    width: '100%',
    marginBottom: 4,
  },
  title: {
    fontWeight: 'bold',
    paddingRight: 4,
    fontSize: '0.9rem',
  },
  text: {
    color: '#7C7C7C',
    fontSize: '0.9rem',
    flex: 1,
  },
});

export default class extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.string,
      PropTypes.array,
    ]),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
        <Text
          style={styles.text}
          numberOfLines={4}
        >
          {this.props.children}
        </Text>
      </View>
    );
  }
}
