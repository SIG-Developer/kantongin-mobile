import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,

  FETCH_LAYOUTS_ID_SUCCESS,
  LAYOUTS_CREATE_SUCCESS,
  LAYOUTS_CREATE_REQUEST,
  FETCH_LAYOUTS_ID_REQUEST,
} from '../constants';

const initialState = {
  blocks: [],
  location: '',
  layoutId: null,
  fetching: false,
};

let newState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LAYOUTS_BLOCKS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_LAYOUTS_BLOCKS_SUCCESS:
      // FIXME: Brainfuck code convert object to array.
      newState = Object.keys(action.payload.blocks)
        .map((k) => {
          action.payload.blocks[k].location = action.payload.location;
          return action.payload.blocks[k];
        })
        .sort((a, b) => a.order - b.order);
      return {
        ...state,
        blocks: newState,
        fetching: false,
      };

    case FETCH_LAYOUTS_BLOCKS_FAIL:
      return {
        ...state,
        layoutId: null,
        fetching: false,
      };

    case FETCH_LAYOUTS_ID_REQUEST:
    case LAYOUTS_CREATE_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_LAYOUTS_ID_SUCCESS:
    case LAYOUTS_CREATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        layoutId: action.payload.layout_id,
      };

    default:
      return state;
  }
}
