import DeviceInfo from 'react-native-device-info';

// Get device info
export const lang = DeviceInfo.getDeviceLocale().split('-')[0];
