import { Navigation } from 'react-native-navigation';

import MainCategory from './containers/MainCategory';
import Drawer from './components/Drawer';
import PushedScreen from './components/Offline';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('MainCatgory', () => MainCategory, store, Provider);
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen, store, Provider);
}
