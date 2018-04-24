import reducer from '../../src/reducers/auth';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESET_STATE,
  AUTH_LOGOUT,
  AUTH_REGESTRATION_SUCCESS,
} from '../../src/constants';


describe('Auth reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      token: null,
      ttl: null,
      logged: false,
      rehydrated: false,
      fetching: false,
      deviceToken: null,
      error: null,
      errorStatus: null,
    };

    expect(reducer(undefined, {})).toEqual(initialState);

    expect(reducer(undefined, {
      type: AUTH_RESET_STATE,
    })).toEqual(initialState);

    expect(reducer(undefined, {
      type: AUTH_LOGOUT,
    })).toEqual(initialState);
  });


  it('should handle AUTH_LOGIN_REQUEST', () => {
    expect(reducer(undefined, {
      type: AUTH_LOGIN_REQUEST,
      payload: {},
    })).toMatchObject({
      fetching: true,
      error: null,
      errorStatus: null,
    });
  });

  it('should handle AUTH_LOGIN_SUCCESS, AUTH_REGESTRATION_SUCCESS', () => {
    const matchResult = {
      token: 'test token',
      ttl: 'ttl',
      logged: true,
      fetching: false,
      error: null,
      errorStatus: null,
    };

    const payload = {
      token: 'test token',
      ttl: 'ttl',
    };

    expect(reducer(undefined, {
      type: AUTH_LOGIN_SUCCESS,
      payload,
    })).toMatchObject(matchResult);
    expect(reducer(undefined, {
      type: AUTH_REGESTRATION_SUCCESS,
      payload,
    })).toMatchObject(matchResult);
  });


  it('should handle AUTH_LOGIN_FAIL', () => {
    expect(reducer(undefined, {
      type: AUTH_LOGIN_FAIL,
      payload: {
        status: '404',
        message: 'Not found',
      },
    })).toMatchObject({
      fetching: false,
      error: 'Not found',
      errorStatus: '404',
    });
  });
});
