import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import Component from 'app/components/Component/Component'


export default class component extends Component {
  render() {
    return (
      <View>
        <Component/>
      </View>
    )  
  }

}

AppRegistry.registerComponent('myapp', () => myapp);