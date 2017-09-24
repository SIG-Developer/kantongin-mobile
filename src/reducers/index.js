import { combineReducers } from 'redux';

import cart from './cart';
import auth from './auth';
import pages from './pages';
import search from './search';
import orders from './orders';
import layouts from './layouts';
import products from './products';
import categories from './categories';
import orderDetail from './orderDetail';
import notifications from './notifications';
import productDetail from './productDetail';

export default combineReducers({
  cart,
  auth,
  pages,
  search,
  orders,
  layouts,
  products,
  categories,
  orderDetail,
  notifications,
  productDetail,
});
