import React from 'react';
import { View, Text } from 'react-native';

export default class QuoteBox extends React.Component {
    
  render() {
    const { quote } = this.props;    
    
    return(
      <View 
        style={{ 
            backgroundColor: "#FBB818", 
            borderRadius: 5, 
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset:{  width: -5,  height: 5,  },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            paddingHorizontal: '5%',
            paddingBottom: '15%',
            paddingTop: '5%'
            }} 
        width="100%">
        <Text style={{ fontSize: 18, lineHeight: 30, textAlign: 'center', fontFamily: 'life-bt-italic' }}>„{quote}“</Text>
        <Text style={{ fontFamily: 'life-bt-roman', fontSize: 18, textAlign: 'right', width: '100%', marginTop: '5%' }}> - Halldór Laxness </Text>
        </View>
    )
  }
}
