import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import config from '../config';

import store from '../store';
import * as authActions from '../actions/authActions';

function RegisterPushListener() {
  return firebase.notifications().onNotification((notif) => {
    let notification = new firebase.notifications.Notification();
    notification = notification
      .setNotificationId(notif.notificationId)
      .setTitle(notif.title)
      .setBody(notif.body)
      .setSound(notif.sound || 'bell.mp3')
      .setData({
        ...notif.data
      });

    if (Platform.OS === 'android') {
      notification.android.setAutoCancel(true);
      notification.android.setColor(config.pushNotificationsColor);
      notification.android.setColorized(true);
      notification.android.setPriority(firebase.notifications.Android.Priority.High);
      notification.android.setSmallIcon('ic_notification');
      notification.android.setVibrate([300]);
      notification.android.setOngoing(true);
      notification.android.setClickAction('open');
      notification.android.setChannelId(config.pushNotificationChannelId);
    }

    firebase.notifications().displayNotification(notification);
  });
}

function RegisterOpenListener(navigator) {
  return firebase.notifications().onNotificationOpened((notificationOpen) => {
    const notif = notificationOpen.notification;
    if (notif.data && notif.data.targetScreen) {
      navigator.handleDeepLink({
        link: notif.data.targetScreen,
        payload: notif.data.payload,
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
        if (Platform.OS === 'android') {
          const channel = new firebase.notifications.Android
            .Channel(
              config.pushNotificationChannelId,
              config.pushNotificationChannelId,
              firebase.notifications.Android.Importance.Max
            );
          firebase
            .notifications()
            .android
            .createChannel(channel);
        }

        console.log("TOKEN (getFCMToken)", token);

        const { auth } = store.getState();
        if (cb) {
          setTimeout(() => cb(token), 2000);
        }

        if (auth.deviceToken !== token) {
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
