import axios from 'axios';
import { lang } from '../utils';
import {
  FETCH_PAGES_REQUEST,
  FETCH_PAGES_FAIL,
  FETCH_PAGES_SUCCESS,
} from '../constants';

const headers = {
  'Content-type': 'application/json',
};

export function fetch() {
  return (dispatch) => {
    dispatch({ type: FETCH_PAGES_REQUEST });
    return axios({
      method: 'get',
      url: `/pages?items_per_page=100&sl=${lang}&page_type=T&status=A&simple=true`,
      headers,
    })
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

