import React from 'react';
import { StyleSheet, Image, Text, View, NetInfo } from 'react-native';

export default class QuoteBox extends React.Component {
    
  render() {
    const { quote } = this.props;
    
    return(
      <View 
        style={{ backgroundColor: "black", flex: 1 }}
        padding="10%"
      >
      {quote}
          </View>
    )
  }
}

const styles = StyleSheet.create({
 
});