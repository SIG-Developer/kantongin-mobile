import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  default: {
    backgroundColor: '#242424',
    borderRadius: 4,
    padding: 14,
  },
  defaultText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  primary: {
    backgroundColor: '#FF6008',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 22,
    paddingRight: 22,
    borderRadius: 4,
  },
  primaryText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '1rem',
  }
});

export default class extends PureComponent {
  static propTypes = {
    style: PropTypes.shape(),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.node,
    ]),
    type: PropTypes.string,
  };

  getStyleByType() {
    switch (this.props.type) {
      case 'primary':
        return {
          btn: styles.primary,
          btnText: styles.primaryText,
        };

      default:
        return {
          btn: styles.default,
          btnText: styles.defaultText,
        };
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[this.getStyleByType().btn, this.props.style]}
        {...this.props}
      >
        <Text style={[this.getStyleByType().btnText]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}
