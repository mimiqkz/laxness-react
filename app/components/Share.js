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
        //Do the share image thing here
        console.info('test');
    }

    async takeScreenShot() {
        const targetPixelCount = 1080; // If you want full HD pictures
        const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
        // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
        const pixels = targetPixelCount / pixelRatio;

        const result = await takeSnapshotAsync(this.imageContainer, {
            result: 'file',
            height: pixels,
            width: pixels,
            quality: 1,
            format: 'png',
        });
        
        this.setState({result});
    }
    async capture() {

    
        const snapshot = await Expo.takeSnapshotAsync(this.image, {
          format: 'jpg',
          quality: 1,
          result: 'file',
          width: 402,
          height: 402
        });
        console.log('whoa dude: ', snapshot);
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


// export async function tackeScreenShoot() {
//     const targetPixelCount = 1080; // If you want full HD pictures
//     const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
//     // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
//     const pixels = targetPixelCount / pixelRatio;

//     const result = await takeSnapshotAsync(this.imageContainer, {
//     result: 'file',
//     height: pixels,
//     width: pixels,
//     quality: 1,
//     format: 'png',
//     });
//     console.info(result)
// }

//  function ShareImage(base64Data){
//     let options = {
//         url: `data:image/png;base64,` + base64Data,
//         type: 'image/png',
//         message: '',
//         title: ''
//     };
//     Share.open(options).then(response => {
//         console.info('testin sharing image')
//     })
//     /*Share.share({
//         message: ICON_PLUS_BASE64,
//         url: "data:image/png;base64,<base64_data>",
//         data: uri,
//         }, {
//         data: uri,
//         // Android only:
//         dialogTitle: 'Deildu með öðrum',
//         // iOS only:
//         excludedActivityTypes: [
//           'com.apple.UIKit.activity.PostToTwitter'
//         ]
//       }),*/

// }