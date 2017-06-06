import { combineReducers } from 'redux';

import nav from './nav';
import cart from './cart';
import auth from './auth';
import flash from './flash';
import modals from './modals';
import products from './products';
import categories from './categories';

export default combineReducers({
  nav,
  cart,
  auth,
  flash,
  modals,
  products,
  categories,
});
