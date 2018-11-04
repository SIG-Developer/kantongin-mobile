import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as wishListActions from '../../src/actions/wishListActions';
import {
  WISH_LIST_FETCH_REQUEST,
  WISH_LIST_FETCH_SUCCESS,

  WISH_LIST_ADD_REQUEST,
  WISH_LIST_ADD_SUCCESS,

  WISH_LIST_REMOVE_REQUEST,
  WISH_LIST_REMOVE_SUCCESS,

  WISH_LIST_CLEAR,

  NOTIFICATION_SHOW,
} from '../../src/constants';

import config from '../../src/config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates WISH_LIST_FETCH_REQUEST, WISH_LIST_FETCH_SUCCESS', () => {
    nock(config.baseUrl)
      .get('/sra_wish_list')
      .query({
        sl: 'en',
        items_per_page: 20,
        s_layouts: config.layoutId,
      })
      .reply(200, {
        products: [
          { id: 1 },
        ],
      });

    const expectedActions = [
      {
        type: WISH_LIST_FETCH_REQUEST,
        payload: {
          fetching: true,
        },
      },
      {
        type: WISH_LIST_FETCH_SUCCESS,
        payload: {
          products: [
            { id: 1 },
          ],
        },
      },
    ];
    const store = mockStore({ layouts: {} });
    return store.dispatch(wishListActions.fetch())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });


  it('creates WISH_LIST_ADD_REQUEST, WISH_LIST_ADD_SUCCESS', () => {
    nock(config.baseUrl)
      .post('/sra_wish_list')
      .query({
        sl: 'en',
        items_per_page: 20,
        s_layouts: config.layoutId,
      })
      .reply(200, {
        products: [
          { id: 1 },
        ],
      });

    const expectedActions = [
      {
        type: WISH_LIST_ADD_REQUEST
      },
      {
        payload: {
          products: [
            {
              id: 1
            },
          ]
        },
        type: WISH_LIST_ADD_SUCCESS
      }, {
        payload: {
          closeLastModal: true,
          text: 'The product was added to your Wish list.',
          title: 'Success',
          type: 'success'
        },
        type: NOTIFICATION_SHOW,
      },
      {
        payload: {
          fetching: false
        },
        type: WISH_LIST_FETCH_REQUEST
      },
    ];
    const store = mockStore({ layouts: {} });
    return store.dispatch(wishListActions.add({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });


  it('creates WISH_LIST_REMOVE_REQUEST, WISH_LIST_REMOVE_SUCCESS', () => {
    const cartID = 1;
    nock(config.baseUrl)
      .delete(`/sra_wish_list/${cartID}`)
      .query({
        sl: 'en',
        items_per_page: 20,
        s_layouts: config.layoutId,
      })
      .reply(200, {
        products: [
          { id: 1 },
        ],
      });

    const expectedActions = [
      {
        type: WISH_LIST_REMOVE_REQUEST
      },
      {
        payload: {
          cartId: 1,
        },
        type: WISH_LIST_REMOVE_SUCCESS
      }
    ];

    const store = mockStore({ layouts: {} });
    return store.dispatch(wishListActions.remove(cartID))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });


  it('creates WISH_LIST_CLEAR', () => {
    nock(config.baseUrl)
      .delete('/sra_wish_list/')
      .query({
        sl: 'en',
        items_per_page: 20,
        s_layouts: config.layoutId,
      })
      .reply(200, {
        products: [
          { id: 1 },
        ],
      });

    const expectedActions = [{ type: WISH_LIST_CLEAR }];

    const store = mockStore({ layouts: {} });
    return store.dispatch(wishListActions.clear())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

