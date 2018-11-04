import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,
} from '../constants';
import Api from '../services/api';

export function fetch(layoutId, location = 'index.index') {
  return (dispatch) => {
    dispatch({ type: FETCH_LAYOUTS_BLOCKS_REQUEST });
    return Api.get(`/sra_bm_layouts/${layoutId}/sra_bm_locations/${location}/sra_bm_blocks`)
      .then((response) => {
        dispatch({
          type: FETCH_LAYOUTS_BLOCKS_SUCCESS,
          payload: {
            blocks: response.data,
            location,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_LAYOUTS_BLOCKS_FAIL,
          payload: error.response.data,
        });
      });
  };
}

export function dummy() {}
