import {
  FETCH_ONE_PRODUCT_REQUEST,
  FETCH_ONE_PRODUCT_FAIL,
  FETCH_ONE_PRODUCT_SUCCESS,

  FETCH_PRODUCT_OPTIONS_REQUEST,
  FETCH_PRODUCT_OPTIONS_FAIL,
  FETCH_PRODUCT_OPTIONS_SUCCESS,
} from '../constants';

const initialState = {
  fetching: true,
  options: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ONE_PRODUCT_REQUEST:
      return {
        ...state,
        fetching: true,
        options: [],
      };

    case FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        ...action.payload.product,
      };


    case FETCH_PRODUCT_OPTIONS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PRODUCT_OPTIONS_SUCCESS:
      return {
        ...state,
        options: Object.keys(action.payload.options).map(k => action.payload.options[k]),
        fetching: false,
      };

    case FETCH_PRODUCT_OPTIONS_FAIL:
    case FETCH_ONE_PRODUCT_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
