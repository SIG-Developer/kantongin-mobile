import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {},
  btn: {
    height: 28,
    width: 28,
    opacity: 0.4,
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
      <View style={styles.badge}>
        <Text style={styles.badgeTextStyle}>
          {cart.amount}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          Navigation.showModal({
            screen: 'Cart',
          });
        }}
      >
        <Image
          source={require('../assets/icons/shopping-cart.png')}
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
