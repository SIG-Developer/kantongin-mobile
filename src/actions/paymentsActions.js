import {
  BILLING_REQUEST,
  BILLING_SUCCESS,
  BILLING_FAIL,

  PAYPAL_SETTLEMENTS_REQUEST,
  PAYPAL_SETTLEMENTS_SUCCESS,
  PAYPAL_SETTLEMENTS_FAIL,

  NOTIFICATION_SHOW,
} from '../constants';

import Api from '../services/api';
import i18n from '../utils/i18n';

export function fetchAll() {
  return (dispatch) => {
    dispatch({ type: BILLING_REQUEST });
    return Api.get('/payments')
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

export function paypalSettlements(orderId, replay, cb = null) {
  return (dispatch) => {
    dispatch({ type: PAYPAL_SETTLEMENTS_REQUEST });
    const data = {
      order_id: orderId,
      replay,
    };
    return Api.post('/sra_settlements', data)
      .then((response) => {
        dispatch({
          type: PAYPAL_SETTLEMENTS_SUCCESS,
          payload: response.data,
        });

        if (cb) {
          cb(response.data);
        }
      })
      .catch((error) => {
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'error',
            title: i18n.gettext('Error'),
            text: i18n.gettext('Something went wrong. Please try again later.'),
          },
        });
        dispatch({
          type: PAYPAL_SETTLEMENTS_FAIL,
          error,
        });
      });
  };
}
