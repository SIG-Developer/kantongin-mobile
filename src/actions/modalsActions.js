import {
  MODAL_SHOW,
  MODAL_HIDE,
} from '../constants';

export function show(type, params = {}, animation = 'slide') {
  return (dispatch) => {
    dispatch({
      type: MODAL_SHOW,
      payload: {
        type,
        params,
        animation,
      },
    });
  };
}

export function hide() {
  return (dispatch) => {
    dispatch({
      type: MODAL_HIDE,
    });
  };
}
