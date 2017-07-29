import { combineReducers } from 'redux';

import cart from './cart';
import auth from './auth';
import flash from './flash';
import modals from './modals';
import orders from './orders';
import products from './products';
import payments from './payments';
import shippings from './shippings';
import categories from './categories';
import productDetail from './productDetail';

export default combineReducers({
  cart,
  auth,
  flash,
  modals,
  orders,
  products,
  payments,
  shippings,
  categories,
  productDetail,
});
