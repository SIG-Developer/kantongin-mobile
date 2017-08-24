import { combineReducers } from 'redux';

import cart from './cart';
import auth from './auth';
import orders from './orders';
import products from './products';
import categories from './categories';
import productDetail from './productDetail';
import orderDetail from './orderDetail';

export default combineReducers({
  cart,
  auth,
  orders,
  products,
  categories,
  orderDetail,
  productDetail,
});
