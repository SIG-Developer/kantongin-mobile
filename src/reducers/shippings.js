import {
  SHIPPING_REQUEST,
  SHIPPING_FAIL,
  SHIPPING_SUCCESS,
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
    case SHIPPING_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case SHIPPING_SUCCESS:
      items = { ...state.items };
      params = { ...action.payload.params };
      return {
        hasMore: false,
        fetching: false,
      };

    case SHIPPING_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
