import axios from 'axios';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
} from '../constants';

export function fetch(page = 1) {
  return (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    return axios.get(`/products?items_per_page=100&page=${page}`)
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

export function fetchByCategory(categoryId, page = 1) {
  return (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    return axios.get(`/categories/${categoryId}/products?items_per_page=100&page=${page}&subcats=Y`)
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
