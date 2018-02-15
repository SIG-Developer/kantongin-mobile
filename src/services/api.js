import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import base64 from 'base-64';

import config from '../config';
import store from '../store';

const sl = DeviceInfo.getDeviceLocale().split('-')[0];

// Config axios defaults.
const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 15000,
  params: {
    sl,
    items_per_page: 50,
    s_layouts: config.layoutId,
  },
});

AxiosInstance.interceptors.request.use((conf) => {
  const state = store.getState();
  const newConf = { ...conf };

  newConf.headers.common['Storefront-Api-Access-Key'] = config.apiKey;
  if (state.auth.token) {
    newConf.headers.common.Authorization = `Basic ${base64.encode(state.auth.token)}:`;
  }
  return newConf;
});

export default AxiosInstance;
