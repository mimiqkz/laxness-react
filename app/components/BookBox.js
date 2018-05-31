import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
          style={baseStyle}>
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
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '5%'
  },
  text: {
    fontFamily: 'life-bt-italic', 
    color: 'white',
    textAlign: 'center',
    padding: '3%',
  },
}); 