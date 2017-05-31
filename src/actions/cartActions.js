import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../constants';

export function addToCart(product) {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
}

export function removeFromCart(product) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });
  };
}
