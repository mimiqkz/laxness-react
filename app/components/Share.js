import { Share, Dimensions, PixelRatio } from "react-native";
import { takeSnapshotAsync, FileSystem } from 'expo';

export async function tackeScreenShoot() {
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
    console.info(result)
}

export function ShareImage(base64Data){
    let options = {
        url: `data:image/png;base64,` + base64Data,
        type: 'image/png',
        message: '',
        title: ''
    };
    Share.open(options).then(response => {
        console.info('testin sharing image')
    })
    /*Share.share({
        message: ICON_PLUS_BASE64,
        url: "data:image/png;base64,<base64_data>",
        data: uri,
        }, {
        data: uri,
        // Android only:
        dialogTitle: 'Deildu með öðrum',
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      }),*/

}
