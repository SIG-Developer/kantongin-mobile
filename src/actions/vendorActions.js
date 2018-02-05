import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_FAIL,
  FETCH_VENDOR_SUCCESS,

  FETCH_VENDOR_CATEGORIES_REQUEST,
  FETCH_VENDOR_CATEGORIES_SUCCESS,
  FETCH_VENDOR_CATEGORIES_FAIL,

} from '../constants';
import Api from '../services/api';
// import i18n from '../utils/i18n';

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

    return Api.get(`/categories/?company_ids=${cid}`)
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

