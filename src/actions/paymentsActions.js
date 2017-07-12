import axios from 'axios';
import {
  BILLING_REQUEST,
  BILLING_SUCCESS,
  BILLING_FAIL,
} from '../constants';

export function fetchAll() {
  return (dispatch) => {
    dispatch({ type: BILLING_REQUEST });
    return axios.get('/payments?items_per_page=200')
      .then((response) => {
        dispatch({
          type: BILLING_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BILLING_FAIL,
          error,
        });
      });
  };
}
