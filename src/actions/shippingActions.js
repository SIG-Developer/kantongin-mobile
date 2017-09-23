import {
  SHIPPING_REQUEST,
  SHIPPING_SUCCESS,
  SHIPPING_FAIL,
} from '../constants';
import userApi from '../services/userApi';

export function fetchAll() {
  return (dispatch) => {
    dispatch({ type: SHIPPING_REQUEST });
    return userApi.get('/shippings?items_per_page=200')
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
