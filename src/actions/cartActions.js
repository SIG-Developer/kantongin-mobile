import axios from 'axios';
import base64 from 'base-64';
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,

  CART_CONTENT_REQUEST,
  CART_CONTENT_SUCCESS,
  CART_CONTENT_FAIL,

  CART_CHANGE_REQUEST,
  CART_CHANGE_SUCCESS,
  CART_CHANGE_FAIL,

  CART_CONTENT_SAVE,

  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,

  CHANGE_AMOUNT,

  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,

  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,
} from '../constants';

const headers = {
  'Content-type': 'application/json',
};

export function fetch(token, fetching = true, cb = null) {
  return (dispatch) => {
    dispatch({
      type: CART_REQUEST,
      payload: {
        fetching,
      }
    });
    if (token) {
      headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
    }
    return axios({
      method: 'get',
      url: '/cart_content/?calculate_shipping=A',
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

export function fetchCart(dispatch, token, fetching = true, cb = null) {
  dispatch({
    type: CART_REQUEST,
    payload: {
      fetching,
    }
  });
  if (token) {
    headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
  }
  return axios({
    method: 'get',
    url: '/cart_content/?calculate_shipping=A',
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
}

export function getUserData(token) {
  return (dispatch) => {
    dispatch({ type: CART_CONTENT_REQUEST });
    if (token) {
      headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
    }
    return dispatch({
      type: CART_CONTENT_SUCCESS,
      payload: {
        "user_data": {
          "user_id": "3",
          "status": "A",
          "user_type": "C",
          "user_login": "customer",
          "referer": "",
          "is_root": "N",
          "company_id": "1",
          "last_login": "1503513379",
          "timestamp": "1116709280",
          "firstname": "Customer",
          "lastname": "Customer",
          "company": "Simtech",
          "email": "customer@example.com",
          "phone": "77 77 777 7777",
          "fax": "",
          "url": "",
          "tax_exempt": "N",
          "lang_code": "en",
          "birthday": "",
          "purchase_timestamp_from": "",
          "purchase_timestamp_to": "",
          "responsible_email": "",
          "usergroups": [],
          "profile_id": "2",
          "profile_type": "P",
          "b_firstname": "Customer",
          "b_lastname": "Customer",
          "b_address": "44 Main street",
          "b_address_2": "",
          "b_city": "Boston",
          "b_county": "",
          "b_state": "MA",
          "b_country": "US",
          "b_zipcode": "02134",
          "b_phone": "",
          "s_firstname": "Customer",
          "s_lastname": "Customer",
          "s_address": "44 Main street",
          "s_address_2": "",
          "s_city": "Boston",
          "s_county": "",
          "s_state": "MA",
          "s_country": "US",
          "s_zipcode": "02134",
          "s_phone": "",
          "s_address_type": "",
          "profile_name": "Main",
          "fields": [],
          "b_country_descr": "United States",
          "s_country_descr": "United States",
          "b_state_descr": "Massachusetts",
          "s_state_descr": "Massachusetts"
      },
      },
    });
    return axios({
      method: 'get',
      url: '/carts/3',
      headers,
    })
      .then((response) => {
        dispatch({
          type: CART_CONTENT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CART_CONTENT_FAIL,
          error,
        });
      });
  };
}

export function saveUserData(data) {
  return (dispatch) => {
    dispatch({
      type: CART_CONTENT_SAVE,
      payload: data,
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
        setTimeout(() => fetch(token, false, cb)(dispatch), 50);
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

export function change(token, id, data, cb = null) {
  return (dispatch) => {
    dispatch({ type: CART_CHANGE_REQUEST });
    if (token) {
      headers.Authorization = `Basic ${base64.encode(`${token}:`)}`;
    }
    return axios({
      method: 'put',
      url: `/cart_content/${id}/`,
      data,
      headers,
    })
      .then((response) => {
        dispatch({
          type: CART_CHANGE_SUCCESS,
          payload: response.data,
        });
        // Calculate cart
        setTimeout(() => fetch(token, false, cb)(dispatch), 50);
      })
      .catch((error) => {
        dispatch({
          type: CART_CHANGE_FAIL,
          error,
        });
      });
  };
}

export function remove(token, id, cb = null) {
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
        // Calculate cart
        setTimeout(() => fetch(token, false, cb)(dispatch), 50);
      })
      .catch((error) => {
        dispatch({
          type: CART_REMOVE_FAIL,
          error,
        });
      });
  };
}

export function changeAmount(cid, amount) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_AMOUNT,
      payload: {
        cid,
        amount,
      },
    });
  };
}
