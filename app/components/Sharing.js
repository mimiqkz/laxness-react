import React from 'react';
import { StyleSheet, Text, Dimensions, Button, Linking, Share, View, TouchableHighlight, Image } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';

export default class Sharing extends React.Component {
    shareImage = async () => {
        const imageURL = this.props.snapshot;
        const response = await fetch('http://laxnessapi.herokuapp.com/api/img/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            base64: imageURL,
          })
        })
        const responseJson = await response.json();
    
        const content = {
          message: responseJson.link,
          title: 'tile share',
          url: responseJson.link,
        };
        const option = { dialogTitle: 'title title title' };
        Share.share(content, option);
      }

  render() {
    const { snapshot } = this.props;
    return (
        <View style={styles.container}> 
            <Text style={ styles.text }>Deildu tilvitnuninni:  </Text>

            <View style={ styles.buttonSizing }>
              <TouchableHighlight style={{ flex: 1}} onPress={this.shareImage}>
                <Image  
                  style={styles.button}
                  source={require('../../assets/sharelogo.png')}
                  resizeMode="contain"
                />
              </TouchableHighlight>

            </View>
            
            
        </View>

        
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: '80%', 
        borderTopWidth: 0.2,  
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start'
    },
    text: {
      marginVertical: '5%',
      fontFamily: 'gotham-book', 
    },
    buttonSizing: {
      flex: 0.3, 
      width: '100%'
    },
    button: {
      width: undefined,
      height: undefined,
      flex: 1
    }
  });