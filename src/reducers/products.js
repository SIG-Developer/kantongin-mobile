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
  fetching: true,
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
      items = { ...state.items };
      params = { ...action.payload.params };
      if (items[params.cid] && action.payload.params.page != 1) { // eslint-disable-line
        items[params.cid] = [
          ...items[params.cid],
          ...action.payload.products
        ];
      } else {
        items[params.cid] = [
          ...action.payload.products,
        ];
      }
      return {
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
