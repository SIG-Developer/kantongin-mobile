import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as layoutsActions from '../../src/actions/layoutsActions';
import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,
} from '../../src/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const layoutId = 33;
  const location = 'index.index';

  it('creates FETCH_LAYOUTS_BLOCKS_REQUEST, FETCH_LAYOUTS_BLOCKS_SUCCESS', () => {
    nock('http://localhost')
      .get(`/sra_bm_layouts/${layoutId}/sra_bm_locations/${location}/sra_bm_blocks`)
      .reply(200, {
        users: [
          { id: 1 },
        ],
      });

    const expectedActions = [
      { type: FETCH_LAYOUTS_BLOCKS_REQUEST },
      {
        type: FETCH_LAYOUTS_BLOCKS_SUCCESS,
        payload: {},
      },
    ];
    const store = mockStore({ layouts: {} });
    return store.dispatch(layoutsActions.fetch(layoutId, location))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

