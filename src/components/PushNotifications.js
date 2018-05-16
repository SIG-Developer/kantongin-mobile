import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FCM, { FCMEvent } from 'react-native-fcm';

import store from '../store';
import * as authActions from '../actions/authActions';

function AddPushListener(navigator) {
  return FCM.on(FCMEvent.Notification, (notif) => {
    if (notif.targetScreen) {
      navigator.handleDeepLink({
        link: notif.targetScreen,
        payload: {},
      });
    }
  });
}

function Init(cb) {
  FCM.requestPermissions({
    badge: true,
    sound: true,
    alert: true
  }).then(() => {
    FCM.getFCMToken().then((token) => {
      const { auth } = store.getState();

      if (cb) {
        setTimeout(() => cb(token), 2000);
      }

      if (auth.pushToken !== token) {
        store.dispatch(authActions.deviceInfo({
          token,
          platform: Platform.OS,
          locale: DeviceInfo.getDeviceLocale(),
          device_id: DeviceInfo.getUniqueID(),
        }));
      }
    });
  }).catch((err) => {
    console.log(err, 'no perms');
  });
}

export default {
  Init,
  AddPushListener,
};
