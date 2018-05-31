import React from 'react';
import { Dimensions, Button, Linking, Share, View } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';


export default class Sharing extends React.Component {
  state = {
    result: null,
    open: false,
  }

  async shareImage() {
    const imageURL = this.state.snapshot;
    console.log(imageURL)
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
    console.log(response);
    const responseJson = await response.json();

    const content = {
      message: responseJson.link,
      title: 'tile share',
      url: responseJson.link,
    };
    const option = { dialogTitle: 'title title title' };
    Share.share(content, option);
  }
  
  onShare = () => {
    const content = {
      message: 'https://flic.kr/p/b3Mthp',
      title: 'tile share',
      url: 'https://flic.kr/p/b3Mthp',
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
