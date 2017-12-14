import {
  SHIPPING_REQUEST,
  SHIPPING_SUCCESS,
  SHIPPING_FAIL,
} from '../constants';
import Api from '../services/api';

export function fetchAll() {
  return (dispatch) => {
    dispatch({ type: SHIPPING_REQUEST });
    return Api.get('/shippings?items_per_page=200')
      .then((response) => {
        dispatch({
          type: SHIPPING_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SHIPPING_FAIL,
          error,
        });
      });
  };
}

export function dummy() {}
