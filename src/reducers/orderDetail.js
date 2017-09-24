import {
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_FAIL,
  FETCH_ORDER_DETAIL_SUCCESS,

  PAYPAL_SETTLEMENTS_REQUEST,
  PAYPAL_SETTLEMENTS_SUCCESS,
  PAYPAL_SETTLEMENTS_FAIL,
} from '../constants';

const initialState = {
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDER_DETAIL_REQUEST:
    case PAYPAL_SETTLEMENTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_ORDER_DETAIL_SUCCESS:
    case PAYPAL_SETTLEMENTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload,
      };

    case FETCH_ORDER_DETAIL_FAIL:
    case PAYPAL_SETTLEMENTS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
