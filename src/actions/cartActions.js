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

  NOTIFICATION_SHOW,

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

import i18n from '../utils/i18n';
import userApi from '../services/userApi';

export function fetch(fetching = true) {
  return (dispatch) => {
    dispatch({
      type: CART_REQUEST,
      payload: {
        fetching,
      }
    });
    return userApi.get('/cart_content/?calculate_shipping=A')
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

export function fetchCart(dispatch, fetching = true) {
  dispatch({
    type: CART_REQUEST,
    payload: {
      fetching,
    }
  });
  return userApi.get('/cart_content/?calculate_shipping=A')
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
}

export function getUserData() {
  return (dispatch) => {
    dispatch({ type: CART_CONTENT_REQUEST });
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
    return userApi.get('/carts/3')
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

export function add(data) {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    return userApi.post('/cart_content/', data)
      .then((response) => {
        dispatch({
          type: ADD_TO_CART_SUCCESS,
          payload: response.data,
        });
        // Calculate cart
        setTimeout(() => fetch(false)(dispatch), 50);
        dispatch({
          type: NOTIFICATION_SHOW,
          payload: {
            type: 'success',
            title: i18n.gettext('Success'),
            text: i18n.gettext('The product was added to your cart.'),
            closeLastModal: true,
          },
        });
      })
      .catch((error) => {
        // Out of stock error
        if (error.response.data.status === 409) {
          dispatch({
            type: NOTIFICATION_SHOW,
            payload: {
              type: 'warning',
              title: i18n.gettext('Notice'),
              text: i18n.gettext('Product has zero inventory and cannot be added to the cart.'),
              closeLastModal: true,
            },
          });
        }
        dispatch({
          type: ADD_TO_CART_FAIL,
          error,
        });
      });
  };
}

export function clear() {
  return (dispatch) => {
    dispatch({ type: CART_CLEAR_REQUEST });
    return userApi.delete('/cart_content/', {})
      .then((response) => {
        dispatch({
          type: CART_CLEAR_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CART_CLEAR_FAIL,
          error,
        });
      });
  };
}

export function change(id, data) {
  return (dispatch) => {
    dispatch({ type: CART_CHANGE_REQUEST });

    return userApi.put(`/cart_content/${id}/`, data)
      .then((response) => {
        dispatch({
          type: CART_CHANGE_SUCCESS,
          payload: response.data,
        });
        // Calculate cart
        setTimeout(() => fetch(false)(dispatch), 50);
      })
      .catch((error) => {
        dispatch({
          type: CART_CHANGE_FAIL,
          error,
        });
      });
  };
}

export function remove(id) {
  return (dispatch) => {
    dispatch({ type: CART_REMOVE_REQUEST });
    return userApi.delete(`/cart_content/${id}/`, {})
      .then((response) => {
        dispatch({
          type: CART_REMOVE_SUCCESS,
          payload: response.data,
        });
        // Calculate cart
        setTimeout(() => fetch(false)(dispatch), 50);
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
