import {
  NOTIFICATION_HIDE,
  NOTIFICATION_SHOW,
} from '../constants';

// eslint-disable-next-line import/prefer-default-export
export function hide(id) {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATION_HIDE,
      payload: {
        id,
      },
    });
  };
}

export function show(text, type = 'error', closeLastModal) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: NOTIFICATION_SHOW,
        payload: {
          type,
          text,
          closeLastModal,
        },
      });
    }, 100);
  };
}
