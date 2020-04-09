import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as firebase from 'firebase';
import { Button } from 'react-native-paper';

export default class MainScreen extends Component {

    logout() {
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('LoginScreen'))
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.logout.bind(this)}>logout</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:150,
    }
})