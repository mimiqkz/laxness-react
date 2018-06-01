import React from 'react';
import { StyleSheet, Text, Dimensions, Button, Linking, Share, View } from "react-native";
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
            <Text style={ styles.text }>Deildu tilvitnunni á samfélagsmiðlum: </Text>
            <Button
                onPress={this.shareImage}
                title="Deila með öðrum"
            />
        </View>

        
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: '80%', 
        paddingVertical: '5%',
        borderTopWidth: 0.2,    
    },
    text: {
      marginBottom: '2%',
      fontFamily: 'gotham-book', 
      textAlign: 'center'
    }
  });