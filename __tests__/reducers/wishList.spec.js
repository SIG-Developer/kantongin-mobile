import reducer from '../../src/reducers/wishList';
import {
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,

  WISH_LIST_REMOVE_SUCCESS,
  WISH_LIST_CLEAR,
} from '../../src/constants';


describe('WishList reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      items: [],
      fetching: false,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle WISH_LIST_FETCH_REQUEST', () => {
    expect(reducer(undefined, {
      type: WISH_LIST_FETCH_REQUEST,
      payload: {
        fetching: true,
      },
    })).toMatchObject({
      fetching: true,
    });
  });


  it('should handle WISH_LIST_FETCH_SUCCESS', () => {
    expect(reducer(undefined, {
      type: WISH_LIST_FETCH_SUCCESS,
      payload: {
        products: {
          123: {
            id: 1,
          },
        },
      },
    })).toMatchObject({
      fetching: false,
      items: [
        {
          cartId: '123',
          id: 1
        }
      ]
    });
  });


  it('should handle WISH_LIST_REMOVE_SUCCESS', () => {
    expect(reducer({
      items: [
        {
          cartId: 123,
          id: 1,
        },
        {
          cartId: 456,
          id: 2,
        }
      ]
    }, {
      type: WISH_LIST_REMOVE_SUCCESS,
      payload: {
        cartId: 123,
      },
    })).toMatchObject({
      fetching: false,
      items: [
        {
          cartId: 456,
          id: 2
        }
      ]
    });
  });


  it('should handle WISH_LIST_CLEAR', () => {
    expect(reducer(undefined, {
      type: WISH_LIST_CLEAR,
    })).toEqual({
      items: [],
      fetching: false,
    });
  });
});
