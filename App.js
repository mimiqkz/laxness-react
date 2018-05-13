<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class myapp extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    )  
  }

}

AppRegistry.registerComponent('myapp', () => myapp);
>>>>>>> 7cc6591e84dac5dbcb8164aaa3e5f5fc64821694
