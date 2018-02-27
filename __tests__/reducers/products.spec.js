import reducer from '../../src/reducers/products';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
} from '../../src/constants';


describe('Products reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      params: {
        page: 1,
      },
      items: {},
      fetching: true,
      hasMore: false,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle FETCH_PRODUCTS_REQUEST', () => {
    expect(reducer(undefined, {
      type: FETCH_PRODUCTS_REQUEST,
    })).toMatchObject({
      fetching: true,
    });
  });


  it('should handle FETCH_PRODUCTS_SUCCESS', () => {
    expect(reducer({
      items: {
        1: [
          {
            id: 2,
          }
        ],
      },
    }, {
      type: FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: [
          {
            id: 1,
          }
        ],
        params: {
          cid: 1,
          page: 2,
        },
      }
    })).toMatchObject({
      fetching: false,
      hasMore: false,
      items: {
        1: [
          {
            id: 2
          },
          {
            id: 1
          }
        ]
      },
      params: {
        cid: 1,
        page: 2
      }
    });
  });


  it('should handle FETCH_PRODUCTS_FAIL', () => {
    expect(reducer(undefined, {
      type: FETCH_PRODUCTS_FAIL,
    })).toMatchObject({
      fetching: false,
    });
  });
});
