import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
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
  topBtn: {
    padding: 10,
  },
  trashIcon: {
    height: 20,
    fontSize: 20,
  },
});

class Cart extends Component {
  static navigationOptions = ({ navigation }) => {
    if (!navigation.state.params) {
      return {};
    }
    let { title, headerRight } = navigation.state.params;
    return {
      title,
      headerRight,
    };
  };

  constructor(props) {
    super(props);
  
    this.state = {
      refreshing: false,
      products: [],
    };
  }

  componentDidMount() {
    const { navigation, cart } = this.props;
    navigation.setParams({
      title: `CART (${cart.amount})`,
      headerRight: this.renderClearCart(),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { cart } = nextProps;
    const products = Object.keys(cart.products).map(k => cart.products[k]);
    this.setState({
      products,
    });
  }

  handleRefresh() {

  }

  renderClearCart = () => {
    return (
      <TouchableOpacity
        style={styles.topBtn}
        onPress={() => {
          Alert.alert(
            'Clear all cart ?',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: () => this.props.cartActions.clear(),
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Icon name="trash" style={styles.trashIcon} />
      </TouchableOpacity>
    );
  };

  renderProductItem(item) {
    return (
      <View style={styles.productItem}>
        <Text>{item.product}</Text>
      </View>
    );
  }

  render() {
    const { products } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={item => +item.product_id}
          renderItem={p => this.renderProductItem(p.item)}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

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
