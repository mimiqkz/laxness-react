import React from 'react';
import { StyleSheet, Image, Text, View, NetInfo } from 'react-native';

export default class BookBox extends React.Component {
    
  render() {
    const { chapter, book } = this.props;    

    return(
      <View 
        style={{ 
            backgroundColor: "#AE7914", 
            borderRadius: 5,
            alignSelf: 'baseline',
            maxWidth: '80%',
            }} 
            >
            <Text style={{ fontFamily: 'life-bt-italic', color: 'white', margin: '5%', fontSize: 14 }}>{chapter + ", " + book}</Text> 
        </View>
    )
  }
}
