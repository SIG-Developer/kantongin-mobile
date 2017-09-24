import {
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_FAIL,
  FETCH_ORDER_DETAIL_SUCCESS,

  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../constants';

const initialState = {
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDER_DETAIL_REQUEST:
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_ORDER_DETAIL_SUCCESS:
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload,
      };

    case FETCH_ORDER_DETAIL_FAIL:
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
