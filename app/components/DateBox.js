import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default class DateBox extends React.Component {
  state = {
    boxHeight: null,
  }

  getHeight(event) {
    const { x, y, width, height } = event.nativeEvent.layout;   
    this.setState({ boxHeight: height })
  }

  render() {
    const { year } = this.props;   
    const { boxHeight } = this.state;
     
    const baseStyle = 
      boxHeight ? 
        [styles.container, 
          { 
            transform: [
              {
                translateY: -(boxHeight/2),
              }    
            ]
          }
        ]
        : styles.container; 

    return(
      <View
      onLayout={this.getHeight.bind(this)} 
      style={Platform.OS === 'ios' ? baseStyle : styles.container}>
        <Text style={styles.text}>{year}</Text> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#653308', 
    borderRadius: 5,
    ...Platform.select({
      ios: {
        position: 'absolute',
        zIndex: 100,
        top: 0,
        right: '5%',
      },
      android: {

      }
    })
  },
  text: {
    fontFamily: 'life-bt-roman', 
    color: 'white', 
    padding: '2%',
  },
});