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
  },
});

AxiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.auth.token) {
    config.headers.common.Authorization = `Basic ${base64.encode(state.auth.token)}:`;
  }
  return config;
});

export default AxiosInstance;
