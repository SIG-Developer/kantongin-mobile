import { combineReducers } from 'redux';

import nav from './nav';
import cart from './cart';
import auth from './auth';
import flash from './flash';
import products from './products';
import categories from './categories';

export default combineReducers({
  nav,
  cart,
  auth,
  flash,
  products,
  categories,
});
