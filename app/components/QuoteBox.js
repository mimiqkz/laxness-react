import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scaleFontSize } from '../utils/Sizing';

export default class QuoteBox extends React.Component {
    
  render() {
    const { quote } = this.props;    
    
    return(
      <View style={styles.container}>        
        <Text style={styles.text}>„{quote}“</Text>
        <Text style={styles.textAuthor}> - Halldór Laxness </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: "#FBB818", 
    borderRadius: 5, 
    shadowOffset:{  width: -5,  height: 5,  },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    paddingHorizontal: '5%',
    paddingVertical: '10%',
  },
  text: {
    fontFamily: 'life-bt-italic',
    fontSize: scaleFontSize(18), 
    lineHeight: 30, 
    textAlign: 'center', 
  },
  textAuthor: {
    marginTop: '5%',
    fontFamily: 'life-bt-roman', 
    fontSize: scaleFontSize(18), 
    textAlign: 'right',
  }
});