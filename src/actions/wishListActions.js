import {
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,
  WISH_LIST_FETCH_FAIL,

  WISH_LIST_ADD_REQUEST,
  WISH_LIST_ADD_SUCCESS,
  WISH_LIST_ADD_FAIL,

  WISH_LIST_REMOVE_REQUEST,
  WISH_LIST_REMOVE_SUCCESS,
  WISH_LIST_REMOVE_FAIL,

  WISH_LIST_CLEAR,

  NOTIFICATION_SHOW,
} from '../constants';

import i18n from '../utils/i18n';
import Api from '../services/api';

export function fetch(fetching = true) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_FETCH_REQUEST,
      payload: {
        fetching,
      }
    });
    return Api.get('/sra_wish_list')
      .then((response) => {
        dispatch({
          type: WISH_LIST_FETCH_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: WISH_LIST_FETCH_FAIL,
          error,
        });
      });
  };
}

export function add(data) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_ADD_REQUEST,
    });
    return Api.post('/sra_wish_list', data)
      .then((response) => {
        dispatch({
          type: WISH_LIST_ADD_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'success',
            title: i18n.gettext('Success'),
            text: i18n.gettext('The product was added to your Wish list.'),
            closeLastModal: true,
          },
        });
        // Calculate cart
        fetch(false)(dispatch);
      })
      .catch((error) => {
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'error',
            title: i18n.gettext('Error'),
            text: i18n.gettext('This product is already in the wish list.'),
            closeLastModal: true,
          },
        });
        dispatch({
          type: WISH_LIST_ADD_FAIL,
          error,
        });
      });
  };
}

export function remove(cartId) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_REMOVE_REQUEST,
    });
    return Api.delete(`/sra_wish_list/${cartId}`, {})
      .then(() => {
        dispatch({
          type: WISH_LIST_REMOVE_SUCCESS,
          payload: {
            cartId,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: WISH_LIST_REMOVE_FAIL,
          error,
        });
      });
  };
}

export function clear() {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_CLEAR,
    });
    return Api.delete('/sra_wish_list/');
  };
}
