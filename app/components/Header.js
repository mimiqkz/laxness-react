import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { heightPercentageToDP } from '../utils/Sizing';

export default class Header extends React.Component {
  render() {
    return (
      <Image
        source={require('../../assets/laxness.png')}
        resizeMode="contain"
        style={styles.image}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    margin: heightPercentageToDP(5)
  }
});
