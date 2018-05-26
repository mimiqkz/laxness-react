import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, Alert} from 'react-native';
import Quote from './app/components/Quote';
import Notification from './app/components/Quote';
import Expo, {Permissions,Notifications,Constants} from 'expo';


class App extends React.Component {

  localNotification = {
    title: 'Halli segir Hæ',
    body: 'Þú hefur fengið nýja tilvitnun',
    android: {
      sound: true,
    },
    ios: {
      sound: true,
    },
  };

  async getNotificationPermission() {
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

  componentWillMount() {
    let t = (new Date());
    t.setHours(10);
    t.setMinutes(30);
    const schedulingOptions = {
      time: t,
      repeat: 'day',
    };
    Notifications.cancelAllScheduledNotificationsAsync();
    Notifications.scheduleLocalNotificationAsync(
      this.localNotification,
      schedulingOptions
    );
  }
  
  render() {
    return (
      <Quote/>
    );
  }
}



export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
