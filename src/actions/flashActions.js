import {
  FLASH_SHOW,
  FLASH_HIDE,
} from '../constants';

export function show(msg) {
  const defaultParams = {
    title: null,
    text: null,
    type: 'error',
    onClose: () => {},
  };
  return (dispatch) => {
    dispatch({
      type: FLASH_SHOW,
      payload: { ...defaultParams, ...msg },
    });
  };
}

export function hide() {
  return (dispatch) => {
    dispatch({
      type: FLASH_HIDE,
    });
  };
}
