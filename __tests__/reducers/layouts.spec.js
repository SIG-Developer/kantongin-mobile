import reducer from '../../src/reducers/layouts';
import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,
} from '../../src/constants';


describe('Layouts reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      blocks: [],
      fetching: false,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle FETCH_LAYOUTS_BLOCKS_REQUEST', () => {
    expect(reducer(undefined, {
      type: FETCH_LAYOUTS_BLOCKS_REQUEST,
      payload: {
        fetching: true,
      }
    })).toMatchObject({
      fetching: true,
    });
  });


  it('should handle FETCH_LAYOUTS_BLOCKS_SUCCESS', () => {
    expect(reducer(undefined, {
      type: FETCH_LAYOUTS_BLOCKS_SUCCESS,
      payload: {
        blocks: {
          1: {
            id: 1,
            order: 10,
          },
          2: {
            id: 2,
            order: 5,
          },
        },
        location: 'index.index'
      }
    })).toMatchObject({
      blocks: [
        {
          id: 2,
          order: 5,
        },
        {
          id: 1,
          order: 10,
        }
      ],
    });
  });


  it('should handle FETCH_LAYOUTS_BLOCKS_FAIL', () => {
    expect(reducer(undefined, {
      type: FETCH_LAYOUTS_BLOCKS_FAIL,
      payload: {}
    })).toMatchObject({
      fetching: false,
    });
  });
});
