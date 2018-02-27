import reducer from '../../src/reducers/orders';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
} from '../../src/constants';


describe('Orders reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      params: {},
      items: [],
      fetching: true,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle FETCH_ORDERS_REQUEST', () => {
    expect(reducer(undefined, {
      type: FETCH_ORDERS_REQUEST,
    })).toMatchObject({
      fetching: true,
    });
  });


  it('should handle FETCH_ORDERS_SUCCESS', () => {
    expect(reducer(undefined, {
      type: FETCH_ORDERS_SUCCESS,
      payload: {
        orders: [
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


  it('should handle FETCH_ORDERS_FAIL', () => {
    expect(reducer(undefined, {
      type: FETCH_ORDERS_FAIL,
    })).toMatchObject({
      fetching: false,
    });
  });
});
