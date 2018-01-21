import {
  FETCH_DISCUSSION_REQUEST,
  FETCH_DISCUSSION_SUCCESS,
  FETCH_DISCUSSION_FAIL,

  POST_DISCUSSION_REQUEST,
  POST_DISCUSSION_SUCCESS,
  POST_DISCUSSION_FAIL,
} from '../constants';

const initialState = {
  isNewPostSent: false,
  fetching: false,

  empty: true,
  average_rating: 0,
  posts: [],
  search: {
    page: 1,
    total_items: 0,
  }
};

let newState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DISCUSSION_REQUEST:
      return {
        ...state,
        empty: true,
        fetching: true,
        isNewPostSent: false,
      };

    case FETCH_DISCUSSION_SUCCESS:
      newState = action.payload.discussion;
      if (action.payload.page !== 1) {
        newState = {
          ...state,
          ...action.payload.discussion,
          posts: [
            ...state.posts,
            ...action.payload.discussion.posts,
          ],
        };
      }
      return {
        ...state,
        ...newState,
        fetching: false,
        empty: action.payload.discussion.average_rating == '',
      };

    case FETCH_DISCUSSION_FAIL:
      return {
        ...state,
        empty: true,
        fetching: false,
      };

    case POST_DISCUSSION_REQUEST:
    case POST_DISCUSSION_FAIL:
      return {
        ...state,
        isNewPostSent: false,
        fetching: true,
      };

    case POST_DISCUSSION_SUCCESS:
      return {
        ...state,
        isNewPostSent: true,
        fetching: false,
      };

    default:
      return state;
  }
}
