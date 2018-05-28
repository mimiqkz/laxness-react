import React from 'react';
import { Dimensions, PixelRatio, CameraRoll, Button, Linking, Share } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';


export default class share extends React.Component {
    state = {
        result: null,
        snapshot: null,
        open: false,
        CameraRoll: null,
        hasCameraPermission: null,
        hasCameraRolePermission:  null,
    }

    async shareImage() {
        const imageURL = this.state.snapshot;
        console.log('here')
        const response = await fetch('http://127.0.0.1:3000/api/img/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base64: imageURL,
              id: 1,
            })
            })
        console.log(response);
        
    }

    async capture() {
        const snapshot = await Expo.takeSnapshotAsync(this.image, {
          format: 'png',
          quality: 1,
          result: 'base64',
          width: 402,
          height: 402
        });
        this.setState({snapshot: snapshot});
        // let saveResult = await CameraRoll.saveToCameraRoll(snapshot, 'photo');
        //this.setState({CameraRoll: saveResult});
        // console.log('whoa dude: ', snapshot);
        this.shareImage(this.snapshot);
      }

    async componentWillMount() {
        // this.takeScreenShot();
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted', loading: true });
        status = await Permissions.askAsync(Permissions.CAMERA_ROLL).status;
        this.setState({ hasCameraRolePermission: status === 'granted', loading: true });
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
