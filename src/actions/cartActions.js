import axios from 'axios';
import base64 from 'base-64';
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,

  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,

  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,

  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,

  REMOVE_FROM_CART,
} from '../constants';

const headers = {
  'Content-type': 'application/json',
};

export function fetch(token, cb = null) {
  return (dispatch) => {
    dispatch({ type: CART_REQUEST });
    if (token) {
      headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
    }
    return axios({
      method: 'get',
      url: '/cart_content/',
      data: {},
      headers,
    })
    .then((response) => {
      dispatch({
        type: CART_SUCCESS,
        payload: response.data,
      });

      if (cb) {
        cb();
      }
    })
    .catch((error) => {
      dispatch({
        type: CART_FAIL,
        error,
      });
    });
  };
}

export function add(data, token = '', cb = null) {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    if (token) {
      headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
    }
    return axios({
      method: 'post',
      url: '/cart_content/',
      data,
      headers,
    })
    .then((response) => {
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: response.data,
      });
      // Calculate cart
      setTimeout(() => fetch(token, cb)(dispatch), 50);
    })
    .catch((error) => {
      dispatch({
        type: ADD_TO_CART_FAIL,
        error,
      });
    });
  };
}

export function clear(token, cb = null) {
  return (dispatch) => {
    dispatch({ type: CART_CLEAR_REQUEST });
    if (token) {
      headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
    }
    return axios({
      method: 'delete',
      url: '/cart_content/',
      data: {},
      headers,
    })
    .then((response) => {
      dispatch({
        type: CART_CLEAR_SUCCESS,
        payload: response.data,
      });

      if (cb) {
        cb();
      }
    })
    .catch((error) => {
      dispatch({
        type: CART_CLEAR_FAIL,
        error,
      });
    });
  };
}

export function remove(token, id) {
  return (dispatch) => {
    dispatch({ type: CART_REMOVE_REQUEST });
    if (token) {
      headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
    }
    return axios({
      method: 'delete',
      url: `/cart_content/${id}/`,
      data: {},
      headers,
    })
    .then((response) => {
      dispatch({
        type: CART_REMOVE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: CART_REMOVE_FAIL,
        error,
      });
    });
  };
}
