import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, Alert} from 'react-native';
import Quote from './app/components/Quote';
import Notification from './app/components/Quote';
import Expo, {Permissions,Notifications,Constants} from 'expo';

async function getNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

class App extends React.Component {

  render() {
    return (
      <Quote/>
    );
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
    t.setHours(16);
    t.setMinutes(30);
    const schedulingOptions = {
        time: t,
        repeat:'day',
      };
    Notifications.cancelAllScheduledNotificationsAsync();
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );


export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
