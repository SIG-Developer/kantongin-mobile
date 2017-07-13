import {
  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,

  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,

  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,

  ORDER_CREATE_SUCCESS,
} from '../constants';

const initialState = {
  amount: 0,
  products: [],
  ids: [],
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        fetching: false,
      };

    case CART_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CART_SUCCESS:
      return {
        ...state,
        ...action.payload,
        fetching: false,
      };

    case CART_FAIL:
      return {
        ...state,
        fetching: false,
      };

    case CART_CLEAR_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CART_CLEAR_SUCCESS:
      return {
        ...state,
        amount: 0,
        products: {},
        fetching: false,
      };

    case CART_CLEAR_FAIL:
      return {
        ...state,
        fetching: false,
      };

    case ORDER_CREATE_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
