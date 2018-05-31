import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      style={baseStyle}>
        <Text style={styles.text}>{year}</Text> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#312321", 
    borderRadius: 5,
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: '5%',
  },
  text: {
    fontFamily: 'life-bt-roman', 
    color: 'white', 
    padding: '3%',
  },
}); 

// <color name="brownPrimary">#B18F4D</color>
// <color name="brownSecondary">#AE7914</color>
// <color name="brownTertiary">#653308</color>