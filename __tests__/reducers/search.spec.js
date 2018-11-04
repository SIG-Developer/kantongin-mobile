import reducer from '../../src/reducers/search';
import {
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_FAIL,
  SEARCH_PRODUCTS_SUCCESS,
} from '../../src/constants';


describe('Search reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      params: {
        page: 1,
      },
      items: [],
      fetching: false,
      hasMore: false,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle SEARCH_PRODUCTS_REQUEST', () => {
    expect(reducer(undefined, {
      type: SEARCH_PRODUCTS_REQUEST,
    })).toMatchObject({
      fetching: true,
    });
  });


  it('should handle SEARCH_PRODUCTS_SUCCESS', () => {
    expect(reducer(undefined, {
      type: SEARCH_PRODUCTS_SUCCESS,
      payload: {
        products: [
          {
            id: 1,
          }
        ],
        params: {
          page: 1,
        },
      }
    })).toMatchObject({
      fetching: false,
      items: [
        {
          id: 1,
        },
      ],
      params: {
        page: 1,
      }
    });
  });


  it('should handle SEARCH_PRODUCTS_FAILS', () => {
    expect(reducer(undefined, {
      type: SEARCH_PRODUCTS_FAIL,
    })).toMatchObject({
      fetching: false,
    });
  });
});
