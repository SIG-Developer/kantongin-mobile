import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import actions.
import * as cartActions from '../actions/cartActions';

// Components

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F8F8F8',
  },
});

class Offline extends Component {
  render() {
    const { cart, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>OFFLINE</Text>
      </View>
    );
  }
}

Offline.navigationOptions = () => {
  return {
    mode: 'modal',
    title: 'Profile',
  };
};

Offline.propTypes = {
  navigation: PropTypes.shape({}),
  cart: PropTypes.shape({}),
};

export default connect(state => ({
  nav: state.nav,
  products: state.products,
  categories: state.categories,
  cart: state.cart,
}),
  dispatch => ({
    cartActions: bindActionCreators(cartActions, dispatch),
  })
)(Offline);
