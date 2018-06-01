import React, { Component } from 'react';
import { StyleSheet, PixelRatio, Text, View, AppRegistry, Button, Platform, Alert} from 'react-native';
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
      <View style={styles.container}>
        <View style={{ flex: 0.4 }}>
          <Header/>
        </View>
        {
          this.state.fontLoaded ?
          <View style={{ flex: 0.6 }}>
            <Quote/>
          </View>
        : null
        }
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDCB6E',
    paddingTop: '5%',
  }
  })

export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
