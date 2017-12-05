import reducer from '../../src/reducers/cart';
import {
  CART_REQUEST,
  CART_SUCCESS,

  CART_CONTENT_SUCCESS,
  CART_CONTENT_SAVE,

  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,

  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,

  CHANGE_AMOUNT,
  AUTH_LOGOUT,
} from '../../src/constants';


describe('Cart reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      amount: 0,
      products: [],
      ids: [],
      fetching: false,
      user_data: {},
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle CART_REQUEST', () => {
    expect(reducer(undefined, {
      type: CART_REQUEST,
      payload: {
        fetching: true,
      }
    })).toMatchObject({
      fetching: true,
    });
  });

  it('should handle CART_SUCCESS', () => {
    expect(reducer(undefined, {
      type: CART_SUCCESS,
      payload: {
        products: [{ product_id: 1, }],
      }
    })).toMatchObject({
      products: [{ product_id: 1, }],
    });
  });
});
