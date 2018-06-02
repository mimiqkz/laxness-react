import React from 'react';
import { StyleSheet, Text, View, NetInfo, Button } from 'react-native';
import Snapshot from './Snapshot';
import QuoteBox from './QuoteBox';

export default class Quote extends React.Component {
  constructor() {
    super();
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }
  state = {
    status: false,
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

  handleConnectivityChange = (status) => {
    this.setState({ status });
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  };

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
        }
      this.setState({ status: isConnected });
      }).catch(err => { console.error(err) });
  }

  render() {
  
    if(!this.state.status) {
      return ( 
        <View style={{ flexDirection: 'row' }}>     
          <QuoteBox quote={'Vinsamlegast athugaðu netsamband'} isQuote={false} /> 
        </View>)
    }

    if (this.state.loading) {
      return (<QuoteBox quote={'Sæki gögn'} isQuote={false} />);
    }

    if (this.state.error) {
      return (<QuoteBox quote={this.state.errorMsg} isQuote={false} />);
    }

    return (
      <Snapshot data={this.state.data}/>
    )
  }
}
