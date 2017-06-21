import axios from 'axios';
import base64 from 'base-64';
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,

  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,

  REMOVE_FROM_CART,
} from '../constants';

export function fetch(token) {
  return (dispatch) => {
    dispatch({ type: CART_REQUEST });
    return axios({
      method: 'get',
      url: '/cart_content/',
      data: {},
      headers: {
        Authorization: `Basic ${base64.encode(`${token}:`)}`,
        'Content-type': 'application/json',
      }
    })
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

export function add(token, params) {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    return axios({
      method: 'post',
      url: '/cart_content/',
      data: params,
      headers: {
        // Authorization: `Basic ${base64.encode(`${token}:`)}`,
        'Content-type': 'application/json',
      }
    })
    .then((response) => {
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ADD_TO_CART_FAIL,
        error,
      });
    });
  };
}

export function remove(product) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });
  };
}
