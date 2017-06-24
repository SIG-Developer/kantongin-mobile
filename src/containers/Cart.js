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
    backgroundColor: '#fff',
  },
});

class Cart extends Component {
  static navigationOptions = ({ navigation }) => {
    let title = 'CART';
    if ('params' in navigation.state) {
      title += ` (${navigation.state.params.amount})`;
    }
    return {
      title,
      headerRight: <Text onPress={() => {
        console.log(this.props, 'right');
      }}>Clear</Text>,
    };
  };

  componentDidMount() {
    const { navigation, cart } = this.props;
    navigation.setParams({
      amount: cart.amount,
    });
  }

  render() {
    const { cart } = this.props;
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

// Cart.navigationOptions = () => {
//   return {
//     title: 'CART',
//   };
// };

Cart.propTypes = {
  navigation: PropTypes.shape({}),
  cart: PropTypes.shape({}),
};

export default connect(state => ({
  nav: state.nav,
  categories: state.categories,
  cart: state.cart,
}),
  dispatch => ({
    cartActions: bindActionCreators(cartActions, dispatch),
  })
)(Cart);
