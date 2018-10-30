import {
  FETCH_ONE_PRODUCT_REQUEST,
  FETCH_ONE_PRODUCT_FAIL,
  FETCH_ONE_PRODUCT_SUCCESS,
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
        list_discount_prc: 0,
      };

    case FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        ...action.payload.product,
        options: Object.keys(action.payload.product.product_options)
          .map(k => action.payload.product.product_options[k]),
        fetching: false,
      };

    case FETCH_ONE_PRODUCT_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
