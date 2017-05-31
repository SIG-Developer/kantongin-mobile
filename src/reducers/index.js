import { combineReducers } from 'redux';

import nav from './nav';
import categories from './categories';
import products from './products';
import cart from './cart';

export default combineReducers({
  nav,
  categories,
  products,
  cart,
});
