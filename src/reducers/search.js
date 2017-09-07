import {
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_FAIL,
  SEARCH_PRODUCTS_SUCCESS,
} from '../constants';

const initialState = {
  params: {
    page: 1,
  },
  items: [],
  fetching: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case SEARCH_PRODUCTS_SUCCESS:
      return {
        params: action.payload.params,
        items: action.payload.products,
        fetching: false,
      };

    case SEARCH_PRODUCTS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
