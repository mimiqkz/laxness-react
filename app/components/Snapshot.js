import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { takeSnapshotAsync, FileSystem, Permissions } from 'expo';
import moment from 'moment/min/moment-with-locales';
import QuoteBox from './QuoteBox';
import BookBox from './BookBox';
import DateBox from './DateBox';
import Sharing from './Sharing';
import {  widthPercentageToDP, heightPercentageToDP } from '../utils/Sizing';

export default class Snapshot extends React.Component {
  state = { 
    snapshot: null,
    hasCameraPermission: null,
  }

  capture = (view) => {    
   takeSnapshotAsync(view, {
      format: 'png',
      quality: 0.9,
      result: 'base64',
      height: 600
    })
    .then((data) => {
      this.setState({ snapshot: data })
    })
    .catch(err => console.error(err))
  
  }

  async componentDidMount() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status });
    } catch(err) { console.error(err) }  
  }

  render() {
    const { chapter, book, quote, year } = { ...this.props.data };
    const march = moment();
    march.locale('is');

    const date = march.format('dddd do MMMM YYYY')

    return (
      <View style={styles.container}>
        <View style={styles.quote}
          collapsable={false} //must have this, else cant capture picture
          ref={ref => { this.image = ref; }}>
          <Text style={styles.textDate}>{date}</Text>
          <View style={styles.detailsContainer}>
          <DateBox year={year} />
            <View style={{ flexDirection: 'row' }}>     
              <QuoteBox quote={quote} />
            </View>
            <BookBox chapter={chapter} book={book} />
          </View>
          </View>
        {this.state.hasCameraPermission && (
          <Sharing 
          capture={this.capture} 
          view={this.image}
          snapshot={this.state.snapshot} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
  },
  quote: {
    marginBottom: heightPercentageToDP(5),
  },
  detailsContainer: {
    position: 'relative',
  },
  textDate: {
    width: '100%',
    marginBottom: '2%',
    fontFamily: 'gotham-book', 
    textAlign: 'left'
  }
});