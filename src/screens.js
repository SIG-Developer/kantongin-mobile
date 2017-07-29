import { Navigation } from 'react-native-navigation';

import Cart from './screens/Cart';
import Drawer from './components/Drawer';
import Categories from './screens/Categories';
import MainCategory from './screens/MainCategory';
import ProductDetail from './screens/ProductDetail';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('Cart', () => Cart, store, Provider);
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('Categories', () => Categories, store, Provider);
  Navigation.registerComponent('MainCategory', () => MainCategory, store, Provider);
  Navigation.registerComponent('ProductDetail', () => ProductDetail, store, Provider);
}
