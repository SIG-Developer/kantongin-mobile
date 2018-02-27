import reducer from '../../src/reducers/discussion';
import {
  FETCH_DISCUSSION_REQUEST,
  FETCH_DISCUSSION_SUCCESS,
  FETCH_DISCUSSION_FAIL,

  POST_DISCUSSION_REQUEST,
  POST_DISCUSSION_SUCCESS,
  POST_DISCUSSION_FAIL,
} from '../../src/constants';


describe('Discussion reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      isNewPostSent: false,
      fetching: false,
      items: {},
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle FETCH_DISCUSSION_REQUEST', () => {
    expect(reducer(undefined, {
      type: FETCH_DISCUSSION_REQUEST
    })).toMatchObject({
      fetching: true,
      isNewPostSent: false,
    });
  });


  it('should handle FETCH_DISCUSSION_FAIL', () => {
    expect(reducer(undefined, {
      type: FETCH_DISCUSSION_FAIL
    })).toMatchObject({
      fetching: false,
    });
  });


  it('should handle POST_DISCUSSION_REQUEST, POST_DISCUSSION_FAIL, POST_DISCUSSION_SUCCESS', () => {
    expect(reducer(undefined, {
      type: POST_DISCUSSION_REQUEST
    })).toMatchObject({
      fetching: true,
      postSentFetching: true
    });

    expect(reducer(undefined, {
      type: POST_DISCUSSION_FAIL
    })).toMatchObject({
      fetching: true,
      postSentFetching: true
    });

    expect(reducer(undefined, {
      type: POST_DISCUSSION_SUCCESS
    })).toMatchObject({
      fetching: false,
      postSentFetching: false
    });
  });


  it('should handle FETCH_DISCUSSION_SUCCESS', () => {
    expect(reducer({
      items: {
        2: {
          posts: [],
        },
      },
    }, {
      type: FETCH_DISCUSSION_SUCCESS,
      payload: {
        page: 2,
        id: 2,
        discussion: {
          posts: [
            {
              msg: 'test msg',
            }
          ],
        },
      }
    })).toMatchObject({
      fetching: false,
      items: {
        2: {
          posts: [
            {
              msg: 'test msg'
            }
          ]
        }
      }
    });
  });
});
