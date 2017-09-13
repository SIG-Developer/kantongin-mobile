import { combineReducers } from 'redux';

import cart from './cart';
import auth from './auth';
import pages from './pages';
import search from './search';
import orders from './orders';
import products from './products';
import categories from './categories';
import productDetail from './productDetail';
import orderDetail from './orderDetail';

export default combineReducers({
  cart,
  auth,
  pages,
  search,
  orders,
  products,
  categories,
  orderDetail,
  productDetail,
});
