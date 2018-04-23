import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '../components/Icon';
import theme from '../config/theme';

const styles = EStyleSheet.create({
  container: {
    minWidth: 40,
    marginRight: -2,
  },
  containerAndroid: {
    minWidth: 40,
    minHeight: '100%',
    marginTop: 10,
    position: 'relative',
  },
  btn: {
    fontSize: 28,
    position: 'relative',
    color: theme.$navBarButtonColor,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 3,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.$primaryColor,
  },
  badgeAndroid: {
    position: 'absolute',
    top: 0,
    right: 3,
    minWidth: 18,
    height: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD542A'
  },
  badgeTextStyle: {
    color: '#fff',
  }
});

class CartBtn extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      amount: PropTypes.number,
    })
  };

  renderBadge = () => {
    const { cart } = this.props;
    if (!cart.amount) {
      return null;
    }

    return (
      <TouchableOpacity
        style={(Platform.OS === 'ios') ? styles.badge : styles.badgeAndroid}
        onPress={() => {
          Navigation.showModal({
            screen: 'Cart',
          });
        }}
      >
        <Text style={styles.badgeTextStyle}>
          {cart.amount}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={(Platform.OS === 'ios') ? styles.container : styles.containerAndroid}
        onPress={() => {
          Navigation.showModal({
            screen: 'Cart',
          });
        }}
      >
        <Icon name="shopping-cart" style={styles.btn} />
        {this.renderBadge()}
      </TouchableOpacity>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
}))(CartBtn);
