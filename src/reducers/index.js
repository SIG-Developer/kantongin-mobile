import { combineReducers } from 'redux';

import nav from './nav';
import categories from './categories';
import products from './products';
import cart from './cart';
import session from './session';

export default combineReducers({
  nav,
  cart,
  session,
  products,
  categories,
});
