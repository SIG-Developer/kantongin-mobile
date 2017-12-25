import {
  WISH_LIST_ADD,
  WISH_LIST_REMOVE,
  WISH_LIST_CLEAR,
} from '../constants';

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case WISH_LIST_ADD:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      };

    case WISH_LIST_REMOVE:
      return {
        params: action.payload.params,
        items: action.payload.products,
        fetching: false,
      };

    case WISH_LIST_CLEAR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
