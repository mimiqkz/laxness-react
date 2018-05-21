import React from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';

export default class Quote extends React.Component {

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
  componentWillMount() {
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        if(isConnected) {
          this.getQuote();
        }else {
          this.setState({status: isConnected});
        }
      })
      .catch(err => console.error(err));
    
  }

  render() {
    const { chapter, book, quote, year } = {...this.state.data};

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
        <Text>{chapter}</Text>      
        <Text>{book}</Text>
        <Text>{quote}</Text>
        <Text>{year}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});