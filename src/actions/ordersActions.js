import axios from 'axios';
import base64 from 'base-64';
import { lang } from '../utils';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
} from '../constants';

export function fetch(token, page = 1) {
  return (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    return axios({
      method: 'get',
      url: `/orders?items_per_page=100&page=${page}&sl=${lang}`,
      headers: {
        Authorization: `Basic ${base64.encode(`${token}:`)}`,
      }
    })
    .then((response) => {
      dispatch({
        type: FETCH_ORDERS_SUCCESS,
        payload: response.data,
      });
      console.log('ok', response.data);
    })
    .catch((error) => {
      console.log('fail', error.response.data);
      dispatch({
        type: FETCH_ORDERS_FAIL,
        error,
      });
    });
  };
}
