import axios from 'axios';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
} from '../constants';

export function login(data) {
  return (dispatch) => {
    dispatch({ type: AUTH_LOGIN_REQUEST });
    return axios.post('/auth_tokens', data)
      .then((response) => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTH_LOGIN_FAIL,
          error
        });
      });
  };
}

