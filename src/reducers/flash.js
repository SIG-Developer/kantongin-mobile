import {
  FLASH_SHOW,
  FLASH_HIDE,
} from '../constants';

const initialState = {
  messages: [],
};

let newState;

export default function (state = initialState, action) {
  switch (action.type) {
    case FLASH_SHOW:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case FLASH_HIDE:
      newState = [...state.messages];
      newState.splice(0, 1);
      return {
        ...state,
        messages: newState,
      };

    default:
      return state;
  }
}
