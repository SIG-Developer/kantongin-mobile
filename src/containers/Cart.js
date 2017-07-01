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
import Swipeout from 'react-native-swipeout';

// Import actions.
import * as cartActions from '../actions/cartActions';

// Components

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  topBtn: {
    padding: 10,
  },
  trashIcon: {
    height: 20,
    fontSize: 20,
  },
  productItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 10,
    flexDirection: 'row',
    padding: 14,
  },
  productItemImage: {
    width: 100,
    height: 100,
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
  },
  productItemPrice: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'black',
  },
  placeOrderBtn: {
    backgroundColor: '#FF6008',
    padding: 14,
  },
  placeOrderBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '1rem',
  },
});

const swipeoutBtns = [
  {
    text: 'Delete',
    type: 'delete'
  }
];

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
    const { cart, navigation } = nextProps;
    const products = Object.keys(cart.products).map(k => cart.products[k]);
    this.setState({
      products,
    });
  }

  handleRefresh() {
  }

  handlePlaceOrder() {

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

  renderProductItem = item => {
    let productImage = null;
    if ('http_image_path' in item.main_pair.detailed) {
      productImage = (<Image
        source={{ uri: item.main_pair.detailed.http_image_path }}
        style={styles.productItemImage}
      />);
    }

    return (
      <Swipeout
        autoClose
        right={swipeoutBtns}
        backgroundColor={'#fff'}
      >
        <View style={styles.productItem}>
          {productImage}
          <View style={styles.productItemDetail}>
            <Text style={styles.productItemName}>
              {item.product}
            </Text>
            <Text style={styles.productItemPrice}>
              {item.amount} x ${item.price}
            </Text>
          </View>
        </View>
      </Swipeout>
    );
  }

  renderPlaceOrder() {
    return (
      <View style={styles.placeOrderContainer}>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={() => this.handlePlaceOrder()}
        >
          <Text style={styles.placeOrderBtnText}>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { products } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderProductItem(item)}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
        />
        {this.renderPlaceOrder()}
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
