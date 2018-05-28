import React from 'react';
import { StyleSheet, Text, View, AppRegistry} from 'react-native';
import Quote from './app/components/Quote';
import Header from './app/components/Header';


class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FDCB6E'}} paddingTop="10%" paddingBottom="5%">
        <View style={{ flex: 0.5 }}>
          <Header/>
        </View>
        <View style={{flex: 0.75, backgroundColor: 'green'}}>
          <Quote/>
        </View>
        <View style={{flex: 0.5, backgroundColor: 'blue'}}>
         {/* <Quote/> */}
        </View>
       

     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDCB6E',
  },
  c1: {
    flex: 1
  }
})

{/* <color name="yellowPrimary">#FBB818</color>
    <color name="yellowSecondary">#FDCB6E</color>

    <color name="brownPrimary">#B18F4D</color>
    <color name="brownSecondary">#AE7914</color>
    <color name="brownTertiary">#653308</color>

    <color name="alphaBlack">#89000000</color> */}

export default App;
AppRegistry.registerComponent('Tilvitnun', () => App);
