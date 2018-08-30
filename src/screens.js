import { Navigation } from 'react-native-navigation';

import Cart from './screens/Cart';
import Page from './screens/Page';
import Login from './screens/Login';
import Drawer from './screens/Drawer';
import Orders from './screens/Orders';
import Vendor from './screens/Vendor';
import Search from './screens/Search';
import Gallery from './screens/Gallery';
import Profile from './screens/Profile';
import Layouts from './screens/Layouts';
import CartBtn from './screens/CartBtn';
import WishList from './screens/WishList';
import Discussion from './screens/Discussion';
import Categories from './screens/Categories';
import WriteReview from './screens/WriteReview';
import OrderDetail from './screens/OrderDetail';
import VendorDetail from './screens/VendorDetail';
import CheckoutAuth from './screens/CheckoutAuth';
import Registration from './screens/Registration';
import ProductDetail from './screens/ProductDetail';
import Notification from './components/Notification';
import CheckoutPayment from './screens/CheckoutPayment';
import CheckoutComplete from './screens/CheckoutComplete';
import CheckoutShipping from './screens/CheckoutShipping';
import CheckoutDelivery from './screens/CheckoutDelivery';
import SettlementsCompleteWebView from './screens/SettlementsCompleteWebView';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
  Navigation.registerComponent('Page', () => Page, store, Provider);
  Navigation.registerComponent('Cart', () => Cart, store, Provider);
  Navigation.registerComponent('Login', () => Login, store, Provider);
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('Search', () => Search, store, Provider);
  Navigation.registerComponent('Orders', () => Orders, store, Provider);
  Navigation.registerComponent('Vendor', () => Vendor, store, Provider);
  Navigation.registerComponent('CartBtn', () => CartBtn, store, Provider);
  Navigation.registerComponent('Profile', () => Profile, store, Provider);
  Navigation.registerComponent('Gallery', () => Gallery, store, Provider);
  Navigation.registerComponent('Layouts', () => Layouts, store, Provider);
  Navigation.registerComponent('WishList', () => WishList, store, Provider);
  Navigation.registerComponent('Discussion', () => Discussion, store, Provider);
  Navigation.registerComponent('Categories', () => Categories, store, Provider);
  Navigation.registerComponent('WriteReview', () => WriteReview, store, Provider);
  Navigation.registerComponent('OrderDetail', () => OrderDetail, store, Provider);
  Navigation.registerComponent('VendorDetail', () => VendorDetail, store, Provider);
  Navigation.registerComponent('Registration', () => Registration, store, Provider);
  Navigation.registerComponent('CheckoutAuth', () => CheckoutAuth, store, Provider);
  Navigation.registerComponent('Notification', () => Notification, store, Provider);
  Navigation.registerComponent('ProductDetail', () => ProductDetail, store, Provider);
  Navigation.registerComponent('CheckoutPayment', () => CheckoutPayment, store, Provider);
  Navigation.registerComponent('CheckoutDelivery', () => CheckoutDelivery, store, Provider);
  Navigation.registerComponent('CheckoutShipping', () => CheckoutShipping, store, Provider);
  Navigation.registerComponent('CheckoutComplete', () => CheckoutComplete, store, Provider);
  Navigation.registerComponent('SettlementsCompleteWebView', () => SettlementsCompleteWebView, store, Provider);
}
