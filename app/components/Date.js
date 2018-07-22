import React from 'react';
import { StyleSheet, Text } from 'react-native';
import moment from 'moment/min/moment-with-locales';


export default class Date extends React.Component {

    render() {

        const date = moment().locale('is').format('dddd Do MMMM YYYY');

        return (
            <Text style={styles.date}>{date}</Text>
        )
    }
}

const styles = StyleSheet.create({
    date: {
        width: '100%',
        marginBottom: '2%',
        fontFamily: 'gotham-book',
        textAlign: 'left'
    }
});