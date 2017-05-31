import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,

  NEXT_CATEGORY,
  PREV_CATEGORY
} from '../constants';

const initialState = {
  params: {},
  items: [],
  activeId: '0',
  path: [],
  fetching: false,
};

let newPath;

function getCategoriesTree(categories, pid = 0) {
  const result = [];

  for (let i = 0; i < categories.length; i += 1) {
    if ('parent_id' in categories[i] && categories[i].parent_id == pid) {
      const found = {
        ...categories[i],
        children: getCategoriesTree(categories, categories[i].category_id),
      };
      result.push(found);
    }
  }
  return result;
}

export default function (state = initialState, action) {
  switch (action.type) {

    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: action.payload.categories,
        params: action.payload.params,
        tree: getCategoriesTree(action.payload.categories),
        fetching: false,
      };

    case NEXT_CATEGORY:
      return {
        ...state,
        activeId: action.payload,
        path: [...state.path, state.activeId],
      };

    case PREV_CATEGORY:
      newPath = [...state.path];
      return {
        ...state,
        activeId: newPath.pop(),
        path: newPath,
      };

    case FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
