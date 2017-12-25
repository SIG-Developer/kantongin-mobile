import {
  WISH_LIST_ADD,
  WISH_LIST_REMOVE,
  WISH_LIST_CLEAR,

  NOTIFICATION_SHOW,
} from '../constants';

import i18n from '../utils/i18n';

export function add(product) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_ADD,
      payload: product,
    });
    dispatch({
      type: NOTIFICATION_SHOW,
      payload: {
        type: 'success',
        title: i18n.gettext('Success'),
        text: i18n.gettext('The product was added to your cart.'),
        closeLastModal: true,
      },
    });
  };
}

export function remove(pid) {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_REMOVE,
      payload: pid,
    });
  };
}

export function clear() {
  return (dispatch) => {
    dispatch({
      type: WISH_LIST_CLEAR,
    });
  };
}
