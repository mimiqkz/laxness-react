import React from 'react';
import { StyleSheet, Text, View, AppRegistry} from 'react-native';
import Quote from './app/components/Quote';

class App extends React.Component {
  render() {
    return (
      <Quote/>
    );
  }
}

export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
