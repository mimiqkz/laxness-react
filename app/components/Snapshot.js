import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { takeSnapshotAsync, Permissions } from 'expo';
import Date from './Date';
import QuoteBox from './QuoteBox';
import BookBox from './BookBox';
import DateBox from './DateBox';
import Sharing from './Sharing';
import { heightPercentageToDP } from '../utils/Sizing';

export default class Snapshot extends React.Component {
  state = {
    snapshot: null,
    hasCameraPermission: null
  };

  capture = view => {
    takeSnapshotAsync(view, {
      format: 'png',
      quality: 0.9,
      result: 'base64',
      height: 600
    })
      .then(data => {
        this.setState({ snapshot: data });
      })
      .catch(err => console.error(err));
  };

  async componentDidMount() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { chapter, book, quote, year } = { ...this.props.data };


    return (
      <View style={styles.container}>
        <Date />
        <View
          style={styles.quote}
          collapsable={false} //must have this, else cant capture picture
          ref={ref => {
            this.image = ref;
          }}
        >
          {Platform.OS === 'ios' ? (
            <View style={styles.detailsContainer}>
              <DateBox year={year} />
              <View style={{ flexDirection: 'row' }}>
                <QuoteBox quote={quote} />
              </View>
              <BookBox chapter={chapter} book={book} />
            </View>
          ) : (
              <View style={{}}>
                <QuoteBox quote={quote} />
                <View style={styles.androidDetails}>
                  <BookBox chapter={chapter} book={book} />
                  <DateBox year={year} />
                </View>
              </View>
            )}
        </View>
        {this.state.hasCameraPermission && (
          <Sharing
            capture={this.capture}
            view={this.image}
            snapshot={this.state.snapshot}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  androidDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(1)
  },
  quote: {
    ...Platform.select({
      ios: {
        marginBottom: heightPercentageToDP(5)
      },
      android: {
        marginBottom: heightPercentageToDP(2)
      }
    })
  },
  detailsContainer: {
    position: 'relative'
  }
});
