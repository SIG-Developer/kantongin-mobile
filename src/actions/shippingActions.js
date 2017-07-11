import axios from 'axios';
import {
  SHIPPING_REQUEST,
  SHIPPING_SUCCESS,
  SHIPPING_FAIL,
} from '../constants';

export function fetchAll() {
  return (dispatch) => {
    dispatch({ type: SHIPPING_REQUEST });
    return axios.get('/shippings?items_per_page=100')
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
