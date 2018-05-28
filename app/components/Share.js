import React from 'react';
import { Dimensions, PixelRatio, CameraRoll, Button, Linking, Share } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';


export default class share extends React.Component {
    state = {
        result: null,
        snapshot: null,
        open: false,
        hasCameraPermission: null,
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

    async capture() {
        const snapshot = await Expo.takeSnapshotAsync(this.image, {
          format: 'png',
          quality: 0.9,
          result: 'base64',
          width: 20,
          height: 40
        });
        this.setState({snapshot: `data:image/png;base64,${snapshot}`});
        // console.log('whoa dude: ', snapshot);
        this.shareImage(this.snapshot);
      }

    async componentWillMount() {
        // this.takeScreenShot();
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted', loading: true });
        
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
            //Use the functionality here m8
            <Button
                onPress={this.capture.bind(this)}
                title="Deila með öðrum"
                ref={ref => { this.image = ref; }}
            />
            /*<Button
                onPress={() => this.onShare()}
                title="Share"
            />*/
        )
    }
}
