import { Linking, Alert } from 'react-native';
import i18n from './i18n';
import config from '../config';

export const registerDrawerDeepLinks = (e, navigator) => {
  if (e.type === 'DeepLink') {
    const parts = e.link.split('/');
    const { payload } = e;
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
    } else if (parts[0] === 'page') {
      navigator.push({
        screen: 'Page',
        backButtonTitle: '',
        passProps: {
          uri: `${config.siteUrl}index.php?dispatch=pages.view&page_id=${parts[1]}&s_layout=${config.layoutId}`,
        },
        ...payload,
      });
    } else if (parts[0] === 'orders' && parts[1]) {
      navigator.push({
        screen: 'OrderDetail',
        passProps: {
          orderId: parts[1],
        },
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
    } else if (parts[0] === 'category') {
      navigator.push({
        screen: 'Categories',
        backButtonTitle: '',
        passProps: {
          cid: parts[1],
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
