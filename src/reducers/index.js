import { combineReducers } from 'redux';

import cart from './cart';
import auth from './auth';
import search from './search';
import orders from './orders';
import products from './products';
import categories from './categories';
import productDetail from './productDetail';
import orderDetail from './orderDetail';

export default combineReducers({
  cart,
  auth,
  search,
  orders,
  products,
  categories,
  orderDetail,
  productDetail,
});
