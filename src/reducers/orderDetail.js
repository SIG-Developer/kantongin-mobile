import {
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_FAIL,
  FETCH_ORDER_DETAIL_SUCCESS,
} from '../constants';

const initialState = {
  fetching: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload,
      };

    case FETCH_ORDER_DETAIL_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
