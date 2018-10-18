import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import base64 from 'base-64';

import config from '../config';
import store from '../store';

import { AUTH_LOGOUT } from '../constants';

const sl = DeviceInfo.getDeviceLocale().split('-')[0];
// Config axios defaults.
const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 100000,
  params: {
    sl,
    items_per_page: 20,
    s_layouts: config.layoutId,
  },
});

AxiosInstance.interceptors.request.use((conf) => {
  const state = store.getState();
  const newConf = { ...conf };

  newConf.headers.common['Storefront-Api-Access-Key'] = config.apiKey;
  newConf.headers.common['Cache-Control'] = 'no-cache';

  if (state.auth.token) {
    newConf.headers.common.Authorization = `Basic ${base64.encode(state.auth.token)}:`;
  }
  return newConf;
});

AxiosInstance.interceptors.response.use(config => config, (error) => {
  if (error.response.status === 401) {
    store.dispatch({
      type: AUTH_LOGOUT,
    });
  } else if (error.response.status === 408 || error.code === 'ECONNABORTED') {
    console.log(`A time happend on url ${error.config.url}`);
  }
  return Promise.reject(error);
});

export default AxiosInstance;
