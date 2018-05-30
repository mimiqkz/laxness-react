import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DateBox extends React.Component {
    
  render() {
    const { year } = this.props;    

    return(
      <View style={styles.container}>
        <Text style={{  }}>{year}</Text> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#653308", 
    borderRadius: 5,
    alignSelf: 'baseline'
  },
  text: {
    fontFamily: 'life-bt-roman', 
    color: 'white', 
    margin: '3%'
  },
}); 