import axios from 'axios';
import { lang } from '../utils';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,

  NEXT_CATEGORY,
  PREV_CATEGORY
} from '../constants';

export function fetch(page = 1) {
  return (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    return axios.get(`/categories?items_per_page=0&page=${page}&sl=${lang}&get_images=1`)
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_CATEGORIES_FAIL,
          error
        });
      });
  };
}

export function nextCategory(parentId) {
  return (dispatch) => {
    dispatch({
      type: NEXT_CATEGORY,
      payload: parentId,
    });
  };
}

export function prevCategory() {
  return (dispatch) => {
    dispatch({
      type: PREV_CATEGORY
    });
  };
}
