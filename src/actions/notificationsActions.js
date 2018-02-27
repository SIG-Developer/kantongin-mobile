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

export function show(params = {
  type: 'success', title: '', text: '', closeLastModal: false
}) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: NOTIFICATION_SHOW,
        payload: {
          ...params,
        },
      });
    }, 100);
  };
}
