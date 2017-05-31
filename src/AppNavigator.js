import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

import Catalog from './containers/Catalog';
import Cart from './containers/Cart';
import Products from './containers/Products';
import WishList from './containers/WishList';
import Profile from './containers/Profile';

const ProductDetailNav = StackNavigator({
  index: {
    screen: Profile,
    path: '/index'
  },
  ii: {
    screen: Profile,
    path: '/ii'
  },
}, {
  initialRouteName: 'index',
  mode: 'modal',
});

const CatalogNav = StackNavigator({
  index: {
    screen: Catalog,
    path: '/'
  },
  products: {
    screen: Products,
    path: '/products'
  },
  productDetail: {
    screen: ProductDetailNav,
    path: '/product/detail'
  }
});

const CartNav = StackNavigator({
  index: {
    screen: Cart,
    path: '/'
  }
});

const AppNavigator = TabNavigator({
  catalog: {
    screen: CatalogNav,
    path: '/catalog'
  },
  cart: {
    title: 'cart',
    screen: CartNav,
    path: '/cart'
  },
  wishlist: {
    title: 'wishlist',
    screen: WishList,
    path: '/wishlist'
  },
  profile: {
    title: 'profile',
    screen: Profile,
    path: '/profile'
  },
}, {
  swipeEnabled: true,
});

export default AppNavigator;
