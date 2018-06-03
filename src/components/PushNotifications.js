import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import config from '../config';

import store from '../store';
import * as authActions from '../actions/authActions';

function RegisterPushListener() {
  firebase.messaging().onTokenRefresh((token) => {
    console.log("TOKEN (refreshUnsubscribe)", token);
  });

  return firebase.notifications().onNotification((notif) => {
    notif.android.setChannelId(config.pushNotificationChannelId);
    if (Platform.OS === 'android') {
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId(notif.notificationId)
        .setTitle(notif.title)
        .setSubtitle(notif.subtitle)
        .setBody(notif.body)
        .setData(notif.data)
        .android.setChannelId(config.pushNotificationChannelId)
        .android.setSmallIcon('ic_notification')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications().displayNotification(localNotification)
        .catch(err => console.error(err));
    } else {
      firebase.notifications().displayNotification(notif); // TODO ios
    }
  });
}

function RegisterOpenListener(navigator) {
  return firebase.notifications().onNotificationOpened((notificationOpen) => {
    const notif = notificationOpen.notification;
    if (notif.data && notif.data.targetScreen) {
      navigator.handleDeepLink({
        link: notif.data.targetScreen,
        payload: {},
      });
    }
  });
}

function Init(cb) {
  firebase.messaging().requestPermission({
    badge: true,
    sound: true,
    alert: true
  }).then(() => {
    firebase.messaging().getToken()
      .then((token) => {
        console.log("TOKEN (getFCMToken)", token);
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
  RegisterPushListener,
  RegisterOpenListener,
};
