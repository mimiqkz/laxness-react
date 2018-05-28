import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, Alert} from 'react-native';
import Quote from './app/components/Quote';
import Header from './app/components/Header';
import Notification from './app/components/Quote';
import Expo, { Permissions, Notifications, Constants} from 'expo';


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
      <View style={{ flex: 1, backgroundColor: '#FDCB6E' }} paddingTop="10%" paddingBottom="5%">
        <View style={{ flex: 0.5 }}>
          <Header/>
        </View>
        <View style={{ flex: 0.75, backgroundColor: 'pink' }} padding="5%">
          <Quote/>
        </View>
        <View style={{ flex: 0.5 }}>
          {/* <Quote/> */}
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDCB6E',
  },
  c1: {
    flex: 1
  }
})

{/* <color name="yellowPrimary">#FBB818</color>
    <color name="yellowSecondary">#FDCB6E</color>

    <color name="brownPrimary">#B18F4D</color>
    <color name="brownSecondary">#AE7914</color>
    <color name="brownTertiary">#653308</color>

    <color name="alphaBlack">#89000000</color> */}

export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
