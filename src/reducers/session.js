import {
  AUTH_LOGIN_SUCCESS,
} from '../constants';

const initialState = {
  token: null,
  ttl: null,
  logged: false,
  fetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        ttl: action.payload.ttl,
        logged: true,
      };

    default:
      return state;
  }
}
