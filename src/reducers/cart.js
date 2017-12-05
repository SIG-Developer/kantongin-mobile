import {
  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,

  CART_CONTENT_SUCCESS,
  CART_CONTENT_SAVE,

  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,

  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,

  CHANGE_AMOUNT,
  AUTH_LOGOUT,
} from '../constants';

const initialState = {
  amount: 0,
  products: [],
  ids: [],
  fetching: false,
  user_data: {},
};

let newProducts = [];
let newState = null;

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
        fetching: action.payload.fetching,
      };

    case CART_SUCCESS:
      newState = action.payload;
      Object.keys(newState.payments).forEach((key) => {
        newState.payments[key].payment_id = key;
      });
      return {
        ...state,
        ...newState,
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

    case CART_CONTENT_SUCCESS:
      return {
        ...state,
        user_data: action.payload.user_data,
      };

    case CART_CONTENT_SAVE:
      return {
        ...state,
        user_data: {
          ...state.user_data,
          ...action.payload,
        }
      };

    case AUTH_LOGOUT:
      return initialState;

    case CHANGE_AMOUNT:
      newProducts = { ...state.products };
      newProducts[action.payload.cid].amount = action.payload.amount;
      return {
        ...state,
        products: newProducts,
      };

    default:
      return state;
  }
}
