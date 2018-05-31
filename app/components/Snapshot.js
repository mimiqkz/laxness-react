import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';
import QuoteBox from './QuoteBox';
import BookBox from './BookBox';
import DateBox from './DateBox';
import Sharing from './Sharing';

export default class Snapshot extends React.Component {
  state = { 
    snapshot: null,
    hasCameraPermission: null,
  }

  async capture() {
    try {
      const snapshot = await takeSnapshotAsync(this.image, {
        format: 'png',
        quality: 0.9,
        result: 'base64',
        height: 600
      });
      this.setState({ snapshot })
    } catch(err) { console.error(err) } 
  }

  componentDidUpdate() {
    if(this.state.hasCameraPermission === 'granted') {
      this.capture()
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status });
  }

  render() {
    const { chapter, book, quote, year } = { ...this.props.data };

    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer} 
          collapsable={false} //must have this, else cant capture picture
          ref={ref => { this.image = ref; }}>
          <Text style={styles.textDate}>Sunnudagur 6 júní 2018</Text>
          <QuoteBox quote={quote} />
          <BookBox chapter={chapter} book={book} />
          {/* <DateBox year={year} />      */}
        </View>
        <Sharing snapshot={this.state.snapshot}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '5%',
  },
  detailsContainer: {
    position: 'relative',
    marginBottom: '10%',
  },
  textDate: {
    width: '100%',
    marginBottom: '2%',
    fontFamily: 'gotham-book',
    textAlign: 'left'
  }
});