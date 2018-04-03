import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESET_STATE,
  AUTH_LOGOUT,
  AUTH_REGESTRATION_SUCCESS,
} from '../constants';

const initialState = {
  token: null,
  ttl: null,
  logged: false,
  rehydrated: false,
  fetching: false,
  error: null,
  errorStatus: null,
  pushToken: '',
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
    case AUTH_REGESTRATION_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        ttl: action.payload.ttl,
        logged: true,
        fetching: false,
        error: null,
        errorStatus: null,
      };

    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload.message,
        errorStatus: action.payload.status,
      };

    case AUTH_RESET_STATE:
    case AUTH_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
