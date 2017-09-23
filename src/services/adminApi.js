import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import base64 from 'base-64';

import config from '../config';

const sl = DeviceInfo.getDeviceLocale().split('-')[0];

// Config axios defaults.
const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 15000,
  params: {
    sl,
    items_per_page: 0,
  },
  headers: {
    Authorization: `Basic ${base64.encode(`${config.username}:${config.apiKey}`)}`,
    'Content-type': 'application/json',
  }
});

export default AxiosInstance;
