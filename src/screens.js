import { Navigation } from 'react-native-navigation';

import Cart from './screens/Cart';
import Login from './screens/Login';
import Search from './screens/Search';
import Drawer from './screens/Drawer';
import Gallery from './screens/Gallery';
import Orders from './screens/Orders';
import Categories from './screens/Categories';
import MainCategory from './screens/MainCategory';
import Registration from './screens/Registration';
import ProductDetail from './screens/ProductDetail';
import Notification from './components/Notification';
import CheckoutAuth from './screens/CheckoutAuth';
import CheckoutDelivery from './screens/CheckoutDelivery';
import CheckoutShipping from './screens/CheckoutShipping';
import CheckoutPayment from './screens/CheckoutPayment';
import CartBtn from './screens/CartBtn';
import CheckoutComplete from './screens/CheckoutComplete';
import Profile from './screens/Profile';
import PayPalCompleteWebView from './screens/PayPalCompleteWebView';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
  Navigation.registerComponent('Cart', () => Cart, store, Provider);
  Navigation.registerComponent('Login', () => Login, store, Provider);
  Navigation.registerComponent('Search', () => Search, store, Provider);
  Navigation.registerComponent('CartBtn', () => CartBtn, store, Provider);
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('Orders', () => Orders, store, Provider);
  Navigation.registerComponent('Gallery', () => Gallery, store, Provider);
  Navigation.registerComponent('Categories', () => Categories, store, Provider);
  Navigation.registerComponent('MainCategory', () => MainCategory, store, Provider);
  Navigation.registerComponent('Notification', () => Notification, store, Provider);
  Navigation.registerComponent('Registration', () => Registration, store, Provider);
  Navigation.registerComponent('ProductDetail', () => ProductDetail, store, Provider);
  Navigation.registerComponent('CheckoutAuth', () => CheckoutAuth, store, Provider);
  Navigation.registerComponent('CheckoutDelivery', () => CheckoutDelivery, store, Provider);
  Navigation.registerComponent('CheckoutShipping', () => CheckoutShipping, store, Provider);
  Navigation.registerComponent('CheckoutPayment', () => CheckoutPayment, store, Provider);
  Navigation.registerComponent('CheckoutComplete', () => CheckoutComplete, store, Provider);
  Navigation.registerComponent('Profile', () => Profile, store, Provider);
  Navigation.registerComponent('PayPalCompleteWebView', () => PayPalCompleteWebView, store, Provider);
}
