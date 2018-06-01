import React from 'react';
import { StyleSheet, Text, Dimensions, Button, Linking, Share, View, TouchableHighlight, Image } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';
import { scaleFontSize, widthPercentageToDP, heightPercentageToDP, } from '../utils/Sizing';

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
        console.log(responseJson);
                        
        const content = {
          contentType: 'link',
          message: `https://${responseJson.link}`,
          title: 'Deildu með öðrum',
          url:  `https://${responseJson.link}`,
          subject: 'Share Link'
        };
        
        const option = { dialogTitle: 'Deildu með öðrum' };
        Share.share(content, option);        
      }

  render() {
    const { snapshot } = this.props;
    return (
        <View style={styles.container}> 
            <Text style={ styles.text }>Deildu tilvitnuninni:  </Text>
            <TouchableHighlight underlayColor="rgba(0, 0,0,0)" onPress={this.shareImage}>
              <Image  
                style={styles.button}
                source={require('../../assets/sharelogo.png')}
                resizeMode="contain"
              />
            </TouchableHighlight>

            
            
        </View>

        
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: '80%', 
        alignItems: 'center',
    },
    text: {
      marginVertical: '3%',
      fontFamily: 'gotham-book', 
    },
    buttonSizing: {
      flex: 0.3, 
      width: '100%',
      height: '100%',
      minWidth: '10%',
      minHeight: '10%'
    },
    button: {
      width: widthPercentageToDP(15),
      height: widthPercentageToDP(15),
      marginBottom: heightPercentageToDP(10),
    }
  });