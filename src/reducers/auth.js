import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESET_STATE,
} from '../constants';

const initialState = {
  token: null,
  ttl: null,
  logged: false,

  fetching: false,
  error: null,
  errorStatus: null,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
        errorStatus: null,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        ttl: action.payload.ttl,
        logged: true,
        fetching: false,
      };

    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload.message,
        errorStatus: action.payload.status,
      };

    case AUTH_RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
