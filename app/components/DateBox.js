import React from 'react';
import { StyleSheet, Image, Text, View, NetInfo } from 'react-native';

export default class DateBox extends React.Component {
    
  render() {
    const { chapter, book, year } = this.props;    

    return(
      <View 
        style={{ 
            backgroundColor: "#653308", 
            borderRadius: 5,
            alignSelf: 'baseline'
            }} 
            >
            <Text style={{ fontFamily: 'life-bt-roman', color: 'white', margin: '3%' }}>{year}</Text> 
        </View>
    )
  }
}
