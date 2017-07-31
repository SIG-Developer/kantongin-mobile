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
import Spinner from '../components/Spinner';
import QtyOption from '../components/QtyOption';

// links
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import { formatPrice } from '../utils';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  topBtn: {
    padding: 10,
  },
  trashIcon: {
    height: 20,
    fontSize: 20,
  },
  productItem: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    flexDirection: 'row',
    paddingBottom: 10,
    padding: 14,
    width: '100%',
    overflow: 'hidden',
  },
  productItemImage: {
    width: 100,
    height: 100,
  },
  productItemDetail: {
    marginLeft: 14,
    width: '70%',
  },
  productItemName: {
    fontSize: '0.9rem',
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productItemPrice: {
    fontSize: '0.7rem',
    color: 'black',
  },
  cartInfo: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  cartInfoTitle: {
    color: '#979797',
  },
  cartInfoTotal: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#FD542A',
  },
  placeOrderBtn: {
    backgroundColor: '#FF6008',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 22,
    paddingRight: 22,
    borderRadius: 4,
  },
  placeOrderBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '1rem',
  },
  emptyListContainer: {
    marginTop: '3rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyListIconWrapper: {
    backgroundColor: '#3FC9F6',
    width: '12rem',
    height: '12rem',
    borderRadius: '6rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListIcon: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '6rem',
  },
  emptyListHeader: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'black',
    marginTop: '1rem',
  },
  emptyListDesc: {
    fontSize: '1rem',
    color: '#24282b',
    marginTop: '0.5rem',
  },
  qtyContainer: {
    position: 'absolute',
    right: 14,
    bottom: 0,
  }
});

class Cart extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
    cartActions: PropTypes.shape({
      fetch: PropTypes.func,
      clear: PropTypes.func,
      remove: PropTypes.func,
      changeAmount: PropTypes.func,
    }),
    auth: PropTypes.shape({}),
    cart: PropTypes.shape({}),
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: '#989898',
  };

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      fetching: true,
      refreshing: false,
    };
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    const { navigator } = this.props;
    const { cartActions, auth } = this.props;

    cartActions.fetch(auth.token);

    navigator.setTitle({
      title: 'Cart'.toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { cart, navigator } = nextProps;
    if (cart.fetching) {
      return;
    }

    const products = Object.keys(cart.products).map((key) => {
      const result = cart.products[key];
      result.cartId = key;
      return result;
    });
    this.setState({
      products,
      fetching: false,
      refreshing: false,
    });

    const navButtons = {
      leftButtons: [
        {
          id: 'sideMenu',
          icon: require('../assets/icons/bars.png'),
        },
      ],
    };

    if (products.length) {
      navButtons.rightButtons = [
        {
          id: 'clearCart',
          icon: require('../assets/icons/trash.png'),
        },
      ];
    }
    navigator.setButtons(navButtons);
  }

  onNavigatorEvent(event) {
    // handle a deep link
    registerDrawerDeepLinks(event, this.props.navigator);
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideMenu') {
        navigator.toggleDrawer({ side: 'left' });
      } else if (event.id === 'clearCart') {
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
      }
    }
  }

  handleRefresh() {
    const { cartActions, auth } = this.props;
    this.setState(
      { refreshing: true },
      () => cartActions.fetch(auth.token),
    );
  }

  handlePlaceOrder() {
    const { auth, navigator } = this.props;

    if (!auth.logged) {
      // return navigation.navigate('Login');
    }
    const products = {};
    this.state.products.forEach((p) => {
      products[p.product_id] = {
        product_id: p.product_id,
        amount: p.amount,
      };
    });
    // return navigation.navigate('Checkout', {
    //   user_id: 3, // FIXME
    //   products,
    // });
  }

  handleRemoveProduct = (product) => {
    const { cartActions, auth } = this.props;
    cartActions.remove(auth.token, product.cartId);
  };

  renderProductItem = (item) => {
    let productImage = null;
    if ('http_image_path' in item.main_pair.detailed) {
      productImage = (<Image
        source={{ uri: item.main_pair.detailed.http_image_path }}
        style={styles.productItemImage}
      />);
    }

    const swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => this.handleRemoveProduct(item),
      },
    ];

    return (
      <Swipeout
        autoClose
        right={swipeoutBtns}
        backgroundColor={'#FAFAFA'}
      >
        <View style={styles.productItem}>
          {productImage}
          <View style={styles.productItemDetail}>
            <Text
              style={styles.productItemName}
              numberOfLines={1}
            >
              {item.product}
            </Text>
            <Text style={styles.productItemPrice}>
              {item.amount} x ${item.price}
            </Text>
          </View>
          <View style={styles.qtyContainer}>
            <QtyOption
              noTitle
              value={item.amount}
              onChange={(val) => {
                this.props.cartActions.changeAmount(item.cartId, val);
              }}
            />
          </View>
        </View>
      </Swipeout>
    );
  }

  renderPlaceOrder() {
    const { cart } = this.props;
    if (!cart.products.length) {
      return null;
    }
    return (
      <View style={styles.cartInfo}>
        <View>
          <Text style={styles.cartInfoTitle}>TOTAL</Text>
          <Text style={styles.cartInfoTotal}>{formatPrice(cart.total)}</Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={() => this.handlePlaceOrder()}
        >
          <Text style={styles.placeOrderBtnText}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderEmptyList = () => {
    if (this.state.fetching) {
      return null;
    }
    return (
      <View style={styles.emptyListContainer}>
        <View style={styles.emptyListIconWrapper}>
          <Icon name="shopping-cart" style={styles.emptyListIcon} />
        </View>
        <Text style={styles.emptyListHeader}>
          Your shopping cart is empty.
        </Text>
        <Text style={styles.emptyListDesc}>
          Looking for ideas?
        </Text>
      </View>
    );
  };

  renderList() {
    const { products } = this.state;
    if (this.state.fetching) {
      return null;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderProductItem(item)}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
          ListEmptyComponent={() => this.renderEmptyList()}
        />
        {this.renderPlaceOrder()}
      </View>
    );
  }

  renderSpinner = () => {
    const { cart } = this.props;
    if (this.state.refreshing) {
      return false;
    }
    return (
      <Spinner visible={cart.fetching} mode="content" />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
        {this.renderSpinner()}
      </View>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  cart: state.cart,
}),
  dispatch => ({
    cartActions: bindActionCreators(cartActions, dispatch),
  })
)(Cart);
