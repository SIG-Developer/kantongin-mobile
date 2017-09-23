import axios from 'axios';
import base64 from 'base-64';
import {
  BILLING_REQUEST,
  BILLING_SUCCESS,
  BILLING_FAIL,

  PAYPAL_SETTLEMENTS_REQUEST,
  PAYPAL_SETTLEMENTS_SUCCESS,
  PAYPAL_SETTLEMENTS_FAIL,
} from '../constants';

const headers = {
  'Content-type': 'application/json',
};

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

export function paypalSettlements(token, orderId, replay) {
  return (dispatch) => {
    dispatch({ type: PAYPAL_SETTLEMENTS_REQUEST });
    const data = {
      order_id: orderId,
      replay,
    };
    return axios({
      method: 'post',
      url: '/sra_settlements/',
      data,
    })
      .then((response) => {
        dispatch({
          type: PAYPAL_SETTLEMENTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PAYPAL_SETTLEMENTS_FAIL,
          error,
        });
      });
  };
}
