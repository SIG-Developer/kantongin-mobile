import axios from 'axios';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESET_STATE,

  AUTH_REGESTRATION_SUCCESS,

  AUTH_LOGOUT,
} from '../constants';
import i18n from '../utils/i18n';

export function login(data, navigator) {
  return (dispatch) => {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    return axios.post('/auth_tokens', data)
      .then((response) => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: response.data,
        });
        navigator.showInAppNotification({
          screen: 'Notification',
          passProps: {
            type: 'success',
            title: i18n.gettext('Success'),
            text: i18n.gettext('You are logged in.')
          }
        });
      })
      .catch((error) => {
        navigator.showInAppNotification({
          screen: 'Notification',
          passProps: {
            type: 'warning',
            title: i18n.gettext('Error'),
            text: i18n.gettext('Wrong password.')
          }
        });
        dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: error.response.data,
        });
      });
  };
}

export function registration(token, navigator) {
  return (dispatch) => {
    dispatch({
      type: AUTH_REGESTRATION_SUCCESS,
      payload: {
        token,
        ttl: null,
      }
    });
    navigator.showInAppNotification({
      screen: 'Notification',
      passProps: {
        type: 'success',
        title: i18n.gettext('Registration'),
        text: i18n.gettext('Registration complete.')
      }
    });
    navigator.dismissModal();
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

