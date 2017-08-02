import DeviceInfo from 'react-native-device-info';
import gettext from 'gettext.js';

const langs = ['ru'];
let jsonData;
const locale = DeviceInfo.getDeviceLocale().split('-')[0];

if (langs.includes(locale)) {
  switch (locale) {
    case 'ru':
      jsonData = require('../locales/ru');
      break;
    default:
  }

  gettext.setLocale(locale);
  gettext.loadJSON(jsonData);
}

export default gettext;
