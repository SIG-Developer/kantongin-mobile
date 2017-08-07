import { Navigation } from 'react-native-navigation';

import Cart from './screens/Cart';
import Search from './screens/Search';
import Drawer from './screens/Drawer';
import Categories from './screens/Categories';
import MainCategory from './screens/MainCategory';
import ProductDetail from './screens/ProductDetail';
import Notification from './components/Notification';
import Login from './screens/Login';
import Registration from './screens/Registration';
import Checkout from './screens/Checkout';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('Cart', () => Cart, store, Provider);
  Navigation.registerComponent('Search', () => Search, store, Provider);
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('Categories', () => Categories, store, Provider);
  Navigation.registerComponent('MainCategory', () => MainCategory, store, Provider);
  Navigation.registerComponent('Notification', () => Notification, store, Provider);
  Navigation.registerComponent('ProductDetail', () => ProductDetail, store, Provider);
  Navigation.registerComponent('Login', () => Login, store, Provider);
  Navigation.registerComponent('Registration', () => Registration, store, Provider);
  Navigation.registerComponent('Checkout', () => Checkout, store, Provider);
}
