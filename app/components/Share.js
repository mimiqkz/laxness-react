import React from 'react';
import { Share, Dimensions, PixelRatio, Button } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';

export default class share extends React.Component {
    state = {
        result: null,
        tokenId: null,
        snapshot: null,
        hasCameraPermission: null,
    }

    shareImage() {
        const base64Data = this.state.snapshot;
        Share.share({
            message: 'deildu með öðrum',
            url: `data:image/png;base64,` + base64Data,
            type: 'image/png',
            title: '',
            }, {
            // Android only:
            dialogTitle: 'Deildu með öðrum',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    async capture() {

        const snapshot = await Expo.takeSnapshotAsync(this.image, {
          format: 'jpg',
          quality: 1,
          result: 'base64',
          width: 402,
          height: 402
        });
        this.setState({snapshot: snapshot});
        // console.log('whoa dude: ', snapshot);
        this.shareImage(this.snapshot);
      }

    async componentWillMount() {
        // this.takeScreenShot();
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted', loading: true });
    }

    render() {
        return (
            //Use the functionality here m8

            <Button
                onPress={this.capture.bind(this)}
                title="Deila með öðrum"
                ref={ref => { this.image = ref; }}
            />
        )
    }
}


//  function ShareImage(base64Data){
//     

// }