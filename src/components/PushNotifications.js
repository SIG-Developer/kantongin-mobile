import FCM, { FCMEvent } from 'react-native-fcm';

import store from '../store';

function AddPushListener(navigator) {
  FCM.on(FCMEvent.Notification, (notif) => {
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
    badge: false,
    sound: true,
    alert: true
  }).then(() => {
    FCM.getFCMToken().then((token) => {
      const { auth } = store.getState();
      setTimeout(() => cb(token), 2000);
      if (auth.pushToken !== token) {
        // send token to server;
        console.log('send token to server', token);
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
