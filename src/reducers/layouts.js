import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,
} from '../constants';

const initialState = {
  blocks: [],
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LAYOUTS_BLOCKS_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_LAYOUTS_BLOCKS_SUCCESS:
      return {
        ...state,
        fetching: false,
      };

    case FETCH_LAYOUTS_BLOCKS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
