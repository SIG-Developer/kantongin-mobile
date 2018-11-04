import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as layoutsActions from '../../src/actions/layoutsActions';
import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
} from '../../src/constants';

import config from '../../src/config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.restore();
  });

  const layoutId = 3;

  it('creates FETCH_LAYOUTS_BLOCKS_REQUEST, FETCH_LAYOUTS_BLOCKS_SUCCESS', () => {
    nock(config.baseUrl)
      .get('/sra_bm_layouts/3/sra_bm_locations/index.index/sra_bm_blocks')
      .query({
        sl: 'en',
        items_per_page: 20,
        s_layouts: layoutId,
      })
      .reply(200, {});
    const expectedActions = [
      { type: FETCH_LAYOUTS_BLOCKS_REQUEST },
      {
        type: FETCH_LAYOUTS_BLOCKS_SUCCESS,
        payload: {},
      },
    ];
    const store = mockStore({ layouts: {} });
    return store.dispatch(layoutsActions.fetch(layoutId))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
  });
});
