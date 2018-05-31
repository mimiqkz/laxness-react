import React from 'react';
import { Dimensions, Button, Linking, Share, View } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';
import PropTypes from 'prop-types';



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
    
    return (

      <Button
        onPress={this.shareImage}
        title="Deila með öðrum"
      />
        
    )
  }
}
