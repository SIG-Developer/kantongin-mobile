import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,

  CART_CHANGE_REQUEST,
  CART_CHANGE_SUCCESS,
  CART_CHANGE_FAIL,

  CART_CONTENT_SAVE_REQUEST,
  CART_CONTENT_SAVE_SUCCESS,
  CART_CONTENT_SAVE_FAIL,

  NOTIFICATION_SHOW,

  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,

  CHANGE_AMOUNT,

  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,

  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,

  CART_RECALCULATE_REQUEST,
  CART_RECALCULATE_SUCCESS,
  CART_RECALCULATE_FAIL,
} from '../constants';

import i18n from '../utils/i18n';
import Api from '../services/api';

export function fetch(fetching = true, calculateShipping = 'A') {
  return (dispatch) => {
    dispatch({
      type: CART_REQUEST,
      payload: {
        fetching,
      }
    });
    return Api.get('/sra_cart_content/', { params: { calculate_shipping: calculateShipping } })
      .then((response) => {
        dispatch({
          type: CART_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CART_FAIL,
          error,
        });
      });
  };
}

export function recalculateTotal(ids) {
  const shippingIds = Object.values(ids);

  return (dispatch) => {
    dispatch({
      type: CART_RECALCULATE_REQUEST,
    });
    return Api.get('/sra_cart_content/', { params: { shipping_ids: shippingIds, calculate_shipping: 'E' } })
      .then((response) => {
        dispatch({
          type: CART_RECALCULATE_SUCCESS,
          payload: response.data,
        });

        return response.data;
      })
      .catch((error) => {
        dispatch({
          type: CART_RECALCULATE_FAIL,
          error,
        });
      });
  };
}

export function saveUserData(data) {
  return (dispatch) => {
    dispatch({
      type: CART_CONTENT_SAVE_REQUEST,
      payload: data,
    });
    return Api.put('/sra_cart_content/', { user_data: data })
      .then(() => {
        dispatch({
          type: CART_CONTENT_SAVE_SUCCESS,
          payload: data,
        });
        fetch(false)(dispatch);
      })
      .catch((error) => {
        dispatch({
          type: CART_CONTENT_SAVE_FAIL,
          error,
        });
      });
  };
}

export function add(data) {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    return Api.post('/sra_cart_content/', data)
      .then((response) => {
        dispatch({
          type: ADD_TO_CART_SUCCESS,
          payload: response.data,
        });
        // Calculate cart
        setTimeout(() => fetch(false)(dispatch), 50);
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'success',
            title: i18n.gettext('Success'),
            text: i18n.gettext('The product was added to your cart.'),
            closeLastModal: false,
          },
        });
      })
      .catch((error) => {
        // Out of stock error
        if (error.response.data.status === 409) {
          dispatch({
            type: NOTIFICATION_SHOW,
            payload: {
              type: 'warning',
              title: i18n.gettext('Notice'),
              text: i18n.gettext('Product has zero inventory and cannot be added to the cart.'),
              closeLastModal: false,
            },
          });
        }
        dispatch({
          type: ADD_TO_CART_FAIL,
          error,
        });
      });
  };
}

export function clear() {
  return (dispatch) => {
    dispatch({ type: CART_CLEAR_REQUEST });
    return Api.delete('/sra_cart_content/', {})
      .then((response) => {
        dispatch({
          type: CART_CLEAR_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CART_CLEAR_FAIL,
          error,
        });
      });
  };
}

export function change(id, data) {
  return (dispatch) => {
    dispatch({ type: CART_CHANGE_REQUEST });

    return Api.put(`/sra_cart_content/${id}/`, data)
      .then((response) => {
        dispatch({
          type: CART_CHANGE_SUCCESS,
          payload: response.data,
        });
        // Calculate cart
      })
      .then(() => fetch(false)(dispatch))
      .catch((error) => {
        dispatch({
          type: CART_CHANGE_FAIL,
          error,
        });
      });
  };
}

export function remove(id) {
  return (dispatch) => {
    dispatch({ type: CART_REMOVE_REQUEST });
    return Api.delete(`/sra_cart_content/${id}/`, {})
      .then((response) => {
        dispatch({
          type: CART_REMOVE_SUCCESS,
          payload: response.data,
        });
        // Calculate cart
        setTimeout(() => fetch(false)(dispatch), 50);
      })
      .catch((error) => {
        dispatch({
          type: CART_REMOVE_FAIL,
          error,
        });
      });
  };
}

export function changeAmount(cid, amount) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_AMOUNT,
      payload: {
        cid,
        amount,
      },
    });
  };
}
