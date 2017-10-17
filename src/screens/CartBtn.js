import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    minWidth: 20,
  },
  containerAndroid: {
    minWidth: 40,
    minHeight: '100%',
    marginTop: 10,
  },
  btn: {
    padding: (Platform.OS === 'ios') ? 14 : 11,
    opacity: 0.4,
    marginTop: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD542A'
  },
  badgeAndroid: {
    position: 'absolute',
    top: 0,
    right: 7,
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

const shoppingCartImage = require('../assets/icons/shopping-cart.png');

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
        <Image
          source={shoppingCartImage}
          style={styles.btn}
        />
        {this.renderBadge()}
      </TouchableOpacity>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
}))(CartBtn);
