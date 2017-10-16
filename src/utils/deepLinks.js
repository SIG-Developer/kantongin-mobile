import { Linking, Alert } from 'react-native';
import i18n from './i18n';

export const registerDrawerDeepLinks = (e, navigator) => {
  if (e.type === 'DeepLink') {
    const parts = e.link.split('/');
    const payload = e.payload;
    if (parts[0] === 'home') {
      navigator.resetTo({
        screen: 'Layouts',
        animated: false,
      });
    } else if (parts[0] === 'cart' && parts[1] === 'content') {
      navigator.resetTo({
        screen: 'Cart',
        animated: false,
      });
    } else if (parts[0] === 'profile') {
      navigator.push({
        screen: 'Profile',
        backButtonTitle: '',
        animated: false,
      });
    } else if (parts[0] === 'orders') {
      navigator.resetTo({
        screen: 'Orders',
        animated: false,
      });
    } else if (parts[0] === 'product') {
      navigator.push({
        screen: 'ProductDetail',
        backButtonTitle: '',
        passProps: {
          pid: parts[1],
          payload,
        }
      });
    } else if (parts[0] === 'http:') {
      Linking.canOpenURL(e.link).then((supported) => {
        if (!supported) {
          return Alert.alert(
            i18n.gettext('Can\'t handle url'),
            ''
          );
        }
        return Linking.openURL(e.link);
      });
    }
  }
};

export const unregisterDrawerDeepLinks = () => {};
