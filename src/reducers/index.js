import { combineReducers } from 'redux';

import nav from './nav';
import cart from './cart';
import auth from './auth';
import flash from './flash';
import modals from './modals';
import orders from './orders';
import products from './products';
import categories from './categories';
import productDetail from './productDetail';

export default combineReducers({
  nav,
  cart,
  auth,
  flash,
  modals,
  orders,
  products,
  categories,
  productDetail,
});
