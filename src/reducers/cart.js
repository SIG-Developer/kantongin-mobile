import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../constants';

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
}
