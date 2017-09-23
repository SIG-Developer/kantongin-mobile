import {
  BILLING_REQUEST,
  BILLING_FAIL,
  BILLING_SUCCESS,
} from '../constants';

const initialState = {
  params: {
    page: 1,
  },
  items: [],
  fetching: true,
  hasMore: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BILLING_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case BILLING_SUCCESS:
      params = { ...action.payload.params };
      items = action.payload.payments.filter(i => i.status === 'A');
      return {
        items,
        params,
        fetching: false,
        hasMore: (params.items_per_page * params.page) < +params.total_items,
      };

    case BILLING_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
