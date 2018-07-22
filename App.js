import React from 'react';
import { StyleSheet, ScrollView, View, AppRegistry, } from 'react-native';
import Quote from './app/components/Quote';
import Header from './app/components/Header';
import { Permissions, Notifications, Font } from 'expo';
import { heightPercentageToDP } from './app/utils/Sizing';

class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  localNotification = {
    title: 'Tilvitnun dagsins',
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
      <ScrollView style={styles.container}>
        <View style={{ height: heightPercentageToDP(40) }}>
          <Header />
        </View>
        {
          this.state.fontLoaded ?
            <Quote />
            : null
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDCB6E',
    paddingTop: heightPercentageToDP(5),
  },
})

export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
