import React from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import Expo, {Permissions,Notifications,Constants} from 'expo';


export default class Notification extends React.Component {

  async function getNotificationPermission() {
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

const localNotification = {
      title: 'Halli segir Hæ',
      body: 'Þú hefur fengið nýja tilvitnun',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };

    var t = (new Date());
    t.setHours(12);
    t.setMinutes(1);
    const schedulingOptions = {
        time: t,
        repeat:'minute',
      };
    Notifications.cancelAllScheduledNotificationsAsync();
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );

}