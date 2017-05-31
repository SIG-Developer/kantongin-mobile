import axios from 'axios';
import base64 from 'base-64';

let config = require('./production');

if (__DEV__) {
  config = require('./development');
}
config = config.default;

// Config axios defaults.
axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers = {
  Authorization: `Basic ${base64.encode(`${config.username}:${config.apiKey}`)}`,
};
