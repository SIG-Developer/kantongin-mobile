import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
} from '../constants';

const initialState = {
  params: {
    page: 1,
  },
  items: {},
  fetching: false,
  hasMore: false,
};

let params = {};
let items = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PRODUCTS_SUCCESS:
      params = { ...action.payload.params };
      items = [...action.payload.products];
      if (params.page > 1) {
        items = [...state.items, ...action.payload.products];
      }
      // FIXME: cacart api return total_items as string
      return {
        ...state,
        params,
        items,
        hasMore: (params.items_per_page * params.page) < +params.total_items,
        fetching: false,
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
