import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import base64 from 'base-64';

let config = require('./production');

const lang = DeviceInfo.getDeviceLocale().split('-')[0];

if (__DEV__) {
  config = require('./development');
}
config = config.default;

// Config axios defaults.
axios.defaults.timeout = 15000;
axios.defaults.params = {
  sl: lang,
};
axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers = {
  Authorization: `Basic ${base64.encode(`${config.username}:${config.apiKey}`)}`,
  'Content-type': 'application/json',
};
