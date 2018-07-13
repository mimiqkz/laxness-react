import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  Share,
  View,
  TouchableOpacity
} from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from '../utils/Sizing';

export default class Sharing extends React.Component {
  async shareImage(imageURL) {
    const response = await fetch('http://laxnessapi.herokuapp.com/api/img/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        base64: imageURL
      })
    });
    const responseJson = await response.json();
    console.log(responseJson);
    const content = {
      contentType: 'link',
      message: `https://${responseJson.link}`,
      title: 'Deildu með öðrum',
      url: `https://${responseJson.link}`,
      subject: 'Share Link'
    };
    const option = { dialogTitle: 'Deildu með öðrum' };
    Share.share(content, option);
  }

  componentDidUpdate() {
    const { snapshot } = this.props;
    this.shareImage(snapshot);
  }
  render() {
    const { capture, view } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => capture(view)}
          underlayColor="#fff"
        >
          <Text style={styles.text}>Deildu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'center'
  },
  text: {
    marginVertical: '3%',
    fontFamily: 'gotham-book',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  shareButton: {
    backgroundColor: '#B18F4D',
    borderRadius: 50,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(5),
    shadowOffset: { width: 1, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    ...Platform.select({
      android: {
        elevation: 1
      }
    })
  }
});
