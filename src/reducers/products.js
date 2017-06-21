import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,

  FETCH_ONE_PRODUCT_REQUEST,
  FETCH_ONE_PRODUCT_FAIL,
  FETCH_ONE_PRODUCT_SUCCESS,

  FETCH_PRODUCT_OPTIONS_REQUEST,
  FETCH_PRODUCT_OPTIONS_FAIL,
  FETCH_PRODUCT_OPTIONS_SUCCESS,
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
let options = {};
let items = {};
let product = {};
let productIndex = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PRODUCTS_SUCCESS:
      params = { ...action.payload.params };
      if (params.page !== 1) {
        items[params.cid] = [...state.items[params.cid], ...action.payload.products];
      } else {
        items[params.cid] = [...action.payload.products];
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

    case FETCH_ONE_PRODUCT_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_ONE_PRODUCT_SUCCESS:
      items = { ...state.items };
      productIndex = items[action.payload.cid].findIndex(i => i.product_id == action.payload.pid);
      product = { ...items[action.payload.cid][productIndex], ...action.payload.product };
      items[action.payload.cid][productIndex] = product;
      return {
        ...state,
        items,
        fetching: true,
      };


    case FETCH_PRODUCT_OPTIONS_REQUEST:
      return {
        ...state,
        fetching: false,
      };

    case FETCH_PRODUCT_OPTIONS_SUCCESS:
      items = { ...state.items };
      productIndex = items[action.payload.cid].findIndex(i => i.product_id == action.payload.pid);
      product = items[action.payload.cid][productIndex];
      // FIXME: Brainfuck code to convert object to array.
      options = Object.keys(action.payload.options).map(k => action.payload.options[k]);
      product.options = options;
      // Asign options to the product.
      items[action.payload.cid][productIndex] = product;
      return {
        ...state,
        items,
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
