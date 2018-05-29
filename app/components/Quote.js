import React from 'react';
import { StyleSheet, Text, View, NetInfo, Button } from 'react-native';
import QuoteBox from './QuoteBox';
import BookBox from './BookBox';
import DateBox from './DateBox';


export default class Quote extends React.Component {
  constructor(){
    super();
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange.bind(this));
  }
  state = {
    status: true,
    data: null,
    loading: true,
    errorMsg: '',
    error: false,
  }

  
  convertError(errorCode) {
    const msg = {
      500: 'Internal Server Error',
      501: 'Not Implemented',
      503: 'Service Unaviable',
      504: 'Gateway Timeout',
    }
    return msg[errorCode];
  }

  handleConnectivityChange() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    this.setState({ status: true });
  }

  getQuote() {
    let errorCode;
    
    fetch('http://laxnessapi.herokuapp.com/api/today') //change the URL later
      .then((data) => {
        errorCode = data.status;
        return data.json();
      })
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch(err => {
        console.error(err);
        const error = this.convertError(errorCode);
        this.setState({ errorMsg: error, error: true });
      });

  }

  componentDidMount() {
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        if(isConnected) {
          this.getQuote();
        }else {
          this.setState({ status: isConnected });
        }
      })
      .catch(err => console.error(err));
    
  }

  render() {
    const { chapter, book, quote, year } = { ...this.state.data };

    if(!this.state.status) {
      return (<Text>Vinsamlegast athugaðu netsamband</Text>)
    }

    if (this.state.loading) {
      return (<Text>Sæki gögn...</Text>);
    }

    if (this.state.error) {
      return (<Text>{this.state.errorMsg}</Text>);
    }

    return (
      <View style={styles.container} >
        <View style={{ width: '100%' }}>
          <Text style={{ fontFamily: 'gotham-book', marginBottom: '2%' }}>Sunnudagur 6 júní 2018</Text>
        </View>
          <QuoteBox quote={quote} />
          {/* <View style={{ width: '100%', backgroundColor: 'pink'}}>
            <BookBox book={book} chapter={chapter} />
          </View>

          <DateBox year={year} /> */}


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: "5%"
  },
});