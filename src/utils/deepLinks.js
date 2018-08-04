import { Linking, Alert } from 'react-native';

import i18n from './i18n';
import config from '../config';
import store from '../store';
import { parseQueryString } from './index';

export const registerDrawerDeepLinks = (event, navigator) => {
  const { auth } = store.getState();

  if (event.type !== 'DeepLink') {
    return;
  }

  const { payload, link } = event;
  const params = parseQueryString(link);

  if (params.dispatch === 'pages.view' && params.page_id) {
    navigator.push({
      screen: 'Page',
      backButtonTitle: '',
      passProps: {
        uri: `${config.siteUrl}index.php?dispatch=pages.view&page_id=${params.page_id}&s_layout=${config.layoutId}`,
      },
      ...payload,
    });
  } else if (params.dispatch === 'cart.content') {
    navigator.resetTo({
      screen: 'Cart',
      animated: false,
    });
  } else if (params.dispatch === 'products.view' && params.product_id) {
    navigator.push({
      screen: 'ProductDetail',
      backButtonTitle: '',
      passProps: {
        pid: params.product_id,
        payload,
      }
    });
  } else if (params.dispatch === 'categories.view' && params.category_id) {
    navigator.push({
      screen: 'Categories',
      backButtonTitle: '',
      passProps: {
        categoryId: params.category_id,
      }
    });
  } else if (params.dispatch === 'companies.products' && params.company_id) {
    navigator.showModal({
      screen: 'Vendor',
      passProps: {
        companyId: params.company_id,
      },
    });
  } else if (link === 'home/') {
    navigator.resetTo({
      screen: 'Layouts',
      animated: false,
    });
  } else if (link.startsWith('http://') || link.startsWith('https://')) {
    Linking.canOpenURL(link).then((supported) => {
      if (!supported) {
        return Alert.alert(
          i18n.gettext('Can\'t handle url'),
          ''
        );
      }
      return Linking.openURL(link);
    });
  }

  if (auth.logged) {
    if (params.dispatch === 'profiles.update') {
      navigator.push({
        screen: 'Profile',
        backButtonTitle: '',
        animated: false,
      });
    } else if (params.dispatch === 'orders.details' && params.order_id) {
      navigator.push({
        screen: 'OrderDetail',
        passProps: {
          orderId: params.order_id,
        },
        animated: false,
      });
    } else if (params.dispatch === 'orders.search') {
      navigator.resetTo({
        screen: 'Orders',
        animated: false,
      });
    }
  }
};

export const unregisterDrawerDeepLinks = () => {};
