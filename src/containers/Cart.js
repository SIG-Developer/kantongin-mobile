import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import actions.
import * as cartActions from '../actions/cartActions';
import * as modalsActions from '../actions/modalsActions';

// Components

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

class Cart extends Component {
  render() {
    const { cart, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Cart asd</Text>
        <Button title='go' onPress={() => this.props.modalsActions.show('Offline')} />
      </View>
    );
  }
}

Cart.navigationOptions = () => {
  return {
    title: 'Cart',
  };
};

Cart.propTypes = {
  navigation: PropTypes.shape({}),
  cart: PropTypes.shape({}),
};

export default connect(state => ({
  nav: state.nav,
  modals: state.modals,
  categories: state.categories,
  cart: state.cart,
}),
  dispatch => ({
    cartActions: bindActionCreators(cartActions, dispatch),
    modalsActions: bindActionCreators(modalsActions, dispatch),
  })
)(Cart);
