import reducer from '../../src/reducers/cart';
import {
  CART_REQUEST,
  CART_SUCCESS,
  CART_CONTENT_SUCCESS,
  CART_CONTENT_SAVE_SUCCESS,
  CART_CLEAR_SUCCESS,
  CHANGE_AMOUNT,
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
        payments: {},
      }
    })).toMatchObject({
      products: [{ product_id: 1, }],
    });
  });


  it('should handle CART_CLEAR_SUCCESS', () => {
    expect(reducer(undefined, {
      type: CART_CLEAR_SUCCESS,
      payload: {}
    })).toMatchObject({
      amount: 0,
      products: {},
      fetching: false,
    });
  });


  it('should handle CART_CONTENT_SUCCESS', () => {
    expect(reducer(undefined, {
      type: CART_CONTENT_SUCCESS,
      payload: {
        user_data: {
          username: 'name',
        },
      },
    })).toMatchObject({
      user_data: {
        username: 'name'
      }
    });
  });


  it('should handle CART_CONTENT_SAVE_SUCCESS', () => {
    expect(reducer({
      user_data: {
        username: 'name',
      }
    }, {
      type: CART_CONTENT_SAVE_SUCCESS,
      payload: {
        username: 'new_name',
      },
    })).toMatchObject({
      user_data: {
        username: 'new_name'
      }
    });
  });


  it('should handle CHANGE_AMOUNT', () => {
    expect(reducer({
      products: {
        1: {
          amount: 1,
        }
      },
    }, {
      type: CHANGE_AMOUNT,
      payload: {
        cid: 1,
        amount: 3,
      },
    })).toMatchObject({
      products: {
        1: {
          amount: 3,
        }
      },
    });
  });
});
