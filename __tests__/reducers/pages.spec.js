import reducer from '../../src/reducers/pages';
import {
  FETCH_PAGES_REQUEST,
  FETCH_PAGES_FAIL,
  FETCH_PAGES_SUCCESS,
} from '../../src/constants';


describe('Pages reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      items: [],
      empty: true,
      fetching: true,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle FETCH_PAGES_REQUEST', () => {
    expect(reducer(undefined, {
      type: FETCH_PAGES_REQUEST,
    })).toMatchObject({
      fetching: true,
    });
  });


  it('should handle FETCH_PAGES_SUCCESS', () => {
    expect(reducer(undefined, {
      type: FETCH_PAGES_SUCCESS,
      payload: {
        1: {
          type: 'pages',
          content: {
            items: [
              {
                id: 1,
              }
            ],
          }
        },
        2: {
          type: 'pages',
          content: {
            items: [
              {
                id: 2,
              }
            ],
          }
        },
      }
    })).toMatchObject({
      empty: true,
      fetching: false,
      items: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    });
  });


  it('should handle FETCH_PAGES_FAIL', () => {
    expect(reducer(undefined, {
      type: FETCH_PAGES_FAIL,
    })).toMatchObject({
      fetching: false,
    });
  });
});
