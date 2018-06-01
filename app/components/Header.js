import React from 'react';
import { StyleSheet, Image, Text, View, NetInfo } from 'react-native';
import { heightPercentageToDP, } from '../utils/Sizing';

export default class Header extends React.Component {
    
  render() {
    return(
      <Image
      source={require('../../assets/laxness.png')}
      resizeMode='contain'
      style={{ 
        flex: 1, 
        width: undefined,
        height: undefined,
        margin: heightPercentageToDP(5),

      }}
    />
    )
  }
}
