import React from 'react';
import { Dimensions, PixelRatio, CameraRoll, Button, Linking } from "react-native";
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';
import Share, {ShareSheet} from 'react-native-share';

export default class share extends React.Component {
    state = {
        result: null,
        snapshot: null,
        open: false,
        CameraRoll: null,
        hasCameraPermission: null,
        hasCameraRolePermission:  null,
    }

    shareImage() {
        const imageURL = this.state.CameraRoll;
        let instagramURL = `instagram://library?AssetPath=${imageURL}`;
        console.info(imageURL.edges);
        // this is commented out for Android works on ios
        //Linking.openURL(instagramURL);
        Linking.openURL(
            `https://www.facebook.com/sharer/${imageURL}`,
          );
        
    }

    async capture() {
        const snapshot = await Expo.takeSnapshotAsync(this.image, {
          format: 'png',
          quality: 1,
          result: 'file',
          width: 402,
          height: 402
        });
        this.setState({snapshot: snapshot});
        let saveResult = await CameraRoll.saveToCameraRoll(snapshot, 'photo');
        this.setState({CameraRoll: saveResult});
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