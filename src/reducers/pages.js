import {
  FETCH_PAGES_REQUEST,
  FETCH_PAGES_FAIL,
  FETCH_PAGES_SUCCESS,
} from '../constants';

const initialState = {
  params: {},
  items: [],
  empty: true,
  fetching: true,
};

let newItems;
let mainPage;

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PAGES_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_PAGES_SUCCESS:
      mainPage = action.payload.pages.find(i => i.page === 'MobileAppSideMenu');
      newItems = [];
      if (mainPage) {
        newItems = action.payload.pages.filter(i => i.parent_id === mainPage.page_id);
      }
      return {
        ...state,
        items: newItems,
        empty: !!newItems.length,
        params: action.payload.params,
        fetching: false,
      };

    case FETCH_PAGES_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
