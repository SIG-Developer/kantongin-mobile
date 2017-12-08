
jest.mock('react-native-device-info', () => ({
  getDeviceLocale: () => 'en-US',
  getUniqueID: () => 123,
}));
