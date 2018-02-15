import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_FAIL,
  FETCH_VENDOR_SUCCESS,

  FETCH_VENDOR_CATEGORIES_REQUEST,
  FETCH_VENDOR_CATEGORIES_SUCCESS,
  FETCH_VENDOR_CATEGORIES_FAIL,

  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,

} from '../constants';
import Api from '../services/api';

export function fetch(id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_VENDOR_REQUEST,
    });

    return Api.get(`/sra_vendors/${id}/`)
      .then((response) => {
        dispatch({
          type: FETCH_VENDOR_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_VENDOR_FAIL,
          error,
        });
      });
  };
}

export function categories(cid) {
  return (dispatch) => {
    dispatch({
      type: FETCH_VENDOR_CATEGORIES_REQUEST,
    });

    return Api.get(`/categories/?company_ids=${cid}&items_per_page=500`)
      .then((response) => {
        dispatch({
          type: FETCH_VENDOR_CATEGORIES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_VENDOR_CATEGORIES_FAIL,
          error,
        });
      });
  };
}

export function products(companyId, page = 1) {
  return (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    return Api.get(`/sra_products?company_id=${companyId}&page=${page}&items_per_page=10`)
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: {
            ...response.data,
            params: {
              ...response.data.params,
              cid: response.data.params.company_id,
            },
          },
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
