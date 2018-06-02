import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default class BookBox extends React.Component {
  state = {
    boxHeight: null,
  }

  getHeight(event) {
    const { x, y, width, height } = event.nativeEvent.layout;   
    this.setState({ boxHeight: height })
  }

  render() {
    const { chapter, book } = this.props;   
    const { boxHeight } = this.state;
     
    const baseStyle = 
      boxHeight ? 
        [styles.container, 
          { 
            transform: [
              {
                translateY: boxHeight/2,
              }    
            ]
          }
        ]
        : styles.container;
    
    return(
        <View
          onLayout={this.getHeight.bind(this)} 
          style={Platform.OS === 'ios' ? baseStyle : styles.container}>
          <Text style={styles.text}>
            {chapter + ", " + book}
          </Text> 
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AE7914',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        position: 'absolute',
        zIndex: 100,
        bottom: 0,
        marginHorizontal: '5%'
      },
      android: {
        
      }
    }),
  },
  text: {
    fontFamily: 'life-bt-italic', 
    color: 'white',
    textAlign: 'center',
    padding: '2%',
  },
}); 