import axios from 'axios';
import { lang } from '../utils';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,

  FETCH_ONE_PRODUCT_REQUEST,
  FETCH_ONE_PRODUCT_FAIL,
  FETCH_ONE_PRODUCT_SUCCESS,

  FETCH_PRODUCT_OPTIONS_REQUEST,
  FETCH_PRODUCT_OPTIONS_FAIL,
  FETCH_PRODUCT_OPTIONS_SUCCESS,
} from '../constants';

export function fetchOptions(cid, pid) {
  return (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_OPTIONS_REQUEST });
    return axios.get(`/options/?product_id=${pid}`)
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCT_OPTIONS_SUCCESS,
          payload: {
            cid,
            pid,
            options: response.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PRODUCT_OPTIONS_FAIL,
          error
        });
      });
  };
}

export function fetch(cid, pid) {
  return (dispatch) => {
    dispatch({ type: FETCH_ONE_PRODUCT_REQUEST });
    return axios.get(`/products/${pid}?sl=${lang}`)
      .then((response) => {
        dispatch({
          type: FETCH_ONE_PRODUCT_SUCCESS,
          payload: {
            cid,
            pid,
            product: response.data,
          },
        });
        // get options.
        setTimeout(() => fetchOptions(cid, pid)(dispatch), 100);
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ONE_PRODUCT_FAIL,
          error
        });
      });
  };
}

export function fetchByCategory(categoryId, page = 1) {
  return (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    return axios.get(`/categories/${categoryId}/products?items_per_page=100&page=${page}&subcats=Y&sl=${lang}`)
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PRODUCTS_FAIL,
          error
        });
      });
  };
}
