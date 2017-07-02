import DeviceInfo from 'react-native-device-info';

import { Dimensions } from 'react-native';

// Calculate product image width and items count.
const WINDOW_WIDTH = Dimensions.get('window').width;
const PRODUCT_AVERAGE_SIZE_PHONE = 130;
const PRODUCT_AVERAGE_SIZE_TABLET = 140;
const MIN_TABLET_WIDTH = 480;
const IMAGE_PADDING_PHONE = 16;
const IMAGE_PADDING_TABLET = 32;

const PRODUCT_AVERAGE_SIZE = (WINDOW_WIDTH > MIN_TABLET_WIDTH) ?
  PRODUCT_AVERAGE_SIZE_TABLET :
  PRODUCT_AVERAGE_SIZE_PHONE;

const IMAGE_PADDING = (WINDOW_WIDTH > MIN_TABLET_WIDTH) ?
  IMAGE_PADDING_PHONE :
  IMAGE_PADDING_TABLET;

export const PRODUCT_NUM_COLUMNS = Math.floor(WINDOW_WIDTH / PRODUCT_AVERAGE_SIZE);
export const PRODUCT_IMAGE_WIDTH = (
    Math.floor((WINDOW_WIDTH / PRODUCT_NUM_COLUMNS) * 10000) / 10000
  ) - IMAGE_PADDING;

// Get device info
export const lang = DeviceInfo.getDeviceLocale().split('-')[0];

// Strip tags
export const stripTags = str => str.replace(/(<([^>]+)>)/ig, '');
