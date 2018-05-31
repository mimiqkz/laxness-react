import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, Alert} from 'react-native';
import Quote from './app/components/Quote';
import Header from './app/components/Header';
import Expo, { Permissions, Notifications, Constants, Font } from 'expo';


class App extends React.Component {
  state = {
    fontLoaded: false,
  }

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

  async componentDidMount() {
    await Font.loadAsync({
      'life-bt-italic': require('./assets/fonts/LifeBTItalic.ttf'),
      'life-bt-roman': require('./assets/fonts/LifeBTRoman.ttf'),
      'gotham-book': require('./assets/fonts/GothamBookRegular.otf'),
    });
    this.setState({ fontLoaded: true });
  }

  componentWillMount() {
    let t = new Date();
    t.setHours(33);
    
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
        <View style={{ flex: 0.75 }}>
          <Header/>
        </View>
        {
          this.state.fontLoaded ?
          <View style={{ flex: 0.75 }}>
            <Quote/>
          </View>
        : null
        }
           <View style={{ flex: 0.5 }}>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDCB6E',
  },
})

export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
