import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Quote extends React.Component {

  state = {
    data: null,
    loading: true,
    error: false,
  }

  componentWillMount() {
    fetch('http://laxnessapi.herokuapp.com/api/today')
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data)
        this.setState({ data, loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: true });
      });
  }

  render() {
    const { chapter, book, quote, year } = {...this.state.data};

    if (this.state.loading) {
      return (<Text>Sæki gögn...</Text>);
    }

    if (this.state.error) {
      return (<Text>Villa við að sækja gögn</Text>);
    }

    return (
      <View>
        <Text>{chapter}</Text>      
        <Text>{book}</Text>
        <Text>{quote}</Text>
        <Text>{year}</Text>
      </View>
    )
  }
}
