import {
  FETCH_PAGES_REQUEST,
  FETCH_PAGES_FAIL,
  FETCH_PAGES_SUCCESS,
} from '../constants';
import Api from '../services/api';

export function fetch() {
  return (dispatch) => {
    dispatch({ type: FETCH_PAGES_REQUEST });
    return Api.get('/pages?items_per_page=100&page_type=T&status=A&simple=true')
      .then((response) => {
        dispatch({
          type: FETCH_PAGES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PAGES_FAIL,
          error,
        });
      });
  };
}

export const dummy = () => {};

