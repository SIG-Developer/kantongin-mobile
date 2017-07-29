import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../theme';

// Import actions.
import * as cartActions from '../actions/cartActions';

// Components

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$colorPrimary',
  },
});

class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            theme.$colorPrimary = 'green';
            EStyleSheet.build({ ...theme });
          }}
        >
          <Text>
            Change theme
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Search.navigationOptions = () => {
  return {
    title: 'SEARCH',
  };
};

Search.propTypes = {
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
)(Search);
