import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = EStyleSheet.create({
  tabIcon: {
    fontSize: '1.2rem',
    color: 'red',
  },
  badge: {
    backgroundColor: '#ff5319',
    borderRadius: 20,
    width: 18,
    height: 18,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -4,
  },
  badgeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '0.6rem',
    backgroundColor: 'transparent',
    paddingTop: 1,
  }
});

class TabIcon extends Component {
  static propTypes = {
    style: PropTypes.shape({}),
    cart: PropTypes.shape({}),
    name: PropTypes.string,
  }

  renderBadge = () => {
    const { name, cart } = this.props;
    let count = 0;

    switch (name) {
      case 'shopping-cart':
        count = cart.amount;
        break;
      default:
        count = 0;
        break;
    }
    if (!count) {
      return null;
    }
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {count}
        </Text>
      </View>
    );
  };

  render() {
    const { style, name } = this.props;
    return (
      <View style={styles.container}>
        <Icon
          name={name}
          style={[styles.tabIcon, style]}
        />
        {this.renderBadge()}
      </View>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
}))(TabIcon);
