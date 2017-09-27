import {
  FETCH_LAYOUTS_BLOCKS_REQUEST,
  FETCH_LAYOUTS_BLOCKS_SUCCESS,
  FETCH_LAYOUTS_BLOCKS_FAIL,

  FETCH_LAYOUTS_ID_REQUEST,
  FETCH_LAYOUTS_ID_SUCCESS,
  FETCH_LAYOUTS_ID_FAIL,

  LAYOUTS_CREATE_REQUEST,
  LAYOUTS_CREATE_SUCCESS,
} from '../constants';
import adminApi from '../services/adminApi';
import { toArray } from '../utils';

const LAYOUT_UNIQ_NAME = 'MobileAppLayout';

export function createLayout(dispatch, layoutId, location) {
  dispatch({ type: LAYOUTS_CREATE_REQUEST });
  return adminApi.post('/sra_bm_layouts', { name: LAYOUT_UNIQ_NAME })
    .then((response) => {
      dispatch({
        type: LAYOUTS_CREATE_SUCCESS,
        payload: {
          layout_id: response.data.layout_id,
        }
      });
      const locationData = { dispatch: 'index.index', name: 'Default', is_default: true, };
      adminApi
        .post(`/sra_bm_layouts/${response.data.layout_id}/sra_bm_locations`, locationData)
        .then(() => fetchBlocks(dispatch, layoutId, location));
    });
}

export function fetchId(dispatch, layoutId, location) {
  dispatch({ type: FETCH_LAYOUTS_ID_REQUEST });
  adminApi.get('/sra_bm_layouts')
    .then((response) => {
      const layouts = toArray(response.data);
      const foundLayout = layouts.filter(item => (item.name === LAYOUT_UNIQ_NAME));
      if (foundLayout.length) {
        dispatch({
          type: FETCH_LAYOUTS_ID_SUCCESS,
          payload: {
            layout_id: foundLayout[0].layout_id,
          }
        });
        return fetchBlocks(dispatch, foundLayout[0].layout_id, location);
      }
      dispatch({ type: FETCH_LAYOUTS_ID_FAIL });
      createLayout(dispatch, layoutId, location);
    });
}


export function fetchBlocks(dispatch, layoutId, location) {
  dispatch({ type: FETCH_LAYOUTS_BLOCKS_REQUEST });
  return adminApi.get(`/sra_bm_layouts/${layoutId}/sra_bm_locations/${location}/sra_bm_blocks`)
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
      fetchId(dispatch, layoutId, location);
    });
}

export function fetch(layoutId, location = 'index.index') {
  return (dispatch) => {
    fetchBlocks(dispatch, layoutId, location);
  };
}

