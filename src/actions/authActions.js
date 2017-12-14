import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESET_STATE,

  AUTH_REGESTRATION_SUCCESS,
  NOTIFICATION_SHOW,

  AUTH_LOGOUT,
} from '../constants';
import Api from '../services/api';
import i18n from '../utils/i18n';
import * as cartActions from './cartActions';

export function login(data) {
  return (dispatch) => {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    return Api.post('/auth_tokens', data)
      .then((response) => {
        cartActions.fetchCart(dispatch, false);
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: error.response.data,
        });
      });
  };
}

export function registration(token) {
  return (dispatch) => {
    dispatch({
      type: AUTH_REGESTRATION_SUCCESS,
      payload: {
        token,
        ttl: null,
      }
    });
    cartActions.fetchCart(dispatch, false);
    dispatch({
      type: NOTIFICATION_SHOW,
      payload: {
        type: 'success',
        title: i18n.gettext('Registration'),
        text: i18n.gettext('Registration complete.'),
        closeLastModal: true,
      },
    });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGOUT,
    });
  };
}

export function resetState() {
  return dispatch => dispatch({ type: AUTH_RESET_STATE });
}

