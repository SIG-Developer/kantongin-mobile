import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  container: {
    width,
    minHeight: (Platform.OS === 'ios') ? 80 : 60,
    backgroundColor: '#D9534F',
    paddingTop: (Platform.OS === 'ios') ? 30 : 12,
    paddingBottom: (Platform.OS === 'ios') ? 4 : 8,
    paddingLeft: 14,
    paddingRight: 14,
  },
  containerSuccess: {
    backgroundColor: '#7DCFB6',
  },
  containerInfo: {
    backgroundColor: '#FCEADE',
  },
  containerWarning: {},
  titleText: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  msgText: {
    color: '#fff',
    fontSize: '0.8rem',
  }
});

export default class extends Component {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const containerStyle = (type) => {
      const result = [styles.container];
      switch (type) {
        case 'success':
          result.push(styles.containerSuccess);
          break;

        case 'warning':
          result.push(styles.containerWarning);
          break;

        case 'info':
          result.push(styles.containerWarning);
          break;

        default:
          break;
      }
      return result;
    };
    const { type, title, text } = this.props;
    return (
      <View
        style={containerStyle(type)}
      >
        { title && <Text style={styles.titleText}>{title}</Text>}
        { text && <Text style={styles.msgText}>{text}</Text>}
      </View>
    );
  }
}
