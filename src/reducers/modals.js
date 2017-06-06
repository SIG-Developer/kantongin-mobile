import { REHYDRATE } from 'redux-persist/constants';
import {
  MODAL_SHOW,
  MODAL_HIDE,
} from '../constants';

const initialState = {
  id: '',
  params: {},
  visible: false,
  animation: 'slide',
  stack: [],
};

let newState = null;

export default function modals(state = initialState, action) {
  switch (action.type) {
    case MODAL_SHOW:
      newState = { ...state };
      if (newState.id !== '') {
        newState.stack.push(newState);
      }
      return {
        ...newState,
        id: action.payload.type,
        params: action.payload.params,
        visible: true,
        animation: action.payload.animation,
      };

    case MODAL_HIDE:
      newState = { ...state };
      if (newState.stack.length) {
        return newState.stack.pop();
      }
      return initialState;

    default:
      return state;
  }
}
