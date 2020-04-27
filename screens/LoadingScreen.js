import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as d3 from 'd3';
import {updateBdata,getBenchMarks, getData} from '../actions/actions'
import {connect} from 'react-redux';

class LoadingScreen extends React.Component {

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyBPRy468mWKldsZ2yx2dyzL8PSCE7rlMJk",
            authDomain: "sample-2216b.firebaseapp.com",
            databaseURL: "https://sample-2216b.firebaseio.com",
            projectId: "sample-2216b",
            storageBucket: "sample-2216b.appspot.com",
            messagingSenderId: "714106496514",
            appId: "1:714106496514:web:40a17f5f0af225dea1691b",
            measurementId: "G-60N4PNB2QH"
        };
        firebase.initializeApp(firebaseConfig);

        // this._interval = setInterval(() => {
        //     console.log("Called..");
        //     firebase.storage().ref('benchmark.csv').getDownloadURL().then(function (url) {
        //         d3.csv(url).then(function (result) {
        //             this.props.getAllBenchmarks(result);
        //             firebase.storage().ref('data.csv').getDownloadURL().then(function (url) {
        //                 d3.csv(url).then(function (result) {
        //                     this.props.getAllData(result);
        //                 }.bind(this))
        //             }.bind(this));
        //         }.bind(this))
        //     }.bind(this));
        //   }, 30000);

        firebase.firestore().collection("collections").doc("documents").onSnapshot((doc) => {
            if (doc.exists) {
                let result = {
                    BDATA_001: parseFloat(doc.data().BDATA_001),
                    BDATA_002: parseFloat(doc.data().BDATA_002),
                    BDATA_003: parseFloat(doc.data().BDATA_003),
                    BDATA_004: parseFloat(doc.data().BDATA_004)
                }
                this.props.updateAllBdata(result);
            } else {
                console.log("no document found");
            }
            firebase.storage().ref('benchmark.csv').getDownloadURL().then(function (url) {
                d3.csv(url).then(function (result) {
                    this.props.getAllBenchmarks(result);
                    firebase.storage().ref('data.csv').getDownloadURL().then(function (url) {
                        d3.csv(url).then(function (result) {
                            this.props.getAllData(result);
                            firebase.auth().onAuthStateChanged(user => {
                                this.props.navigation.navigate(user ? 'MainScreen' : 'LoginScreen')
                            })
                        }.bind(this))
                    }.bind(this));
                }.bind(this))
            }.bind(this));
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapDispatchToProps = dispatch => ({
    updateAllBdata: data => {
        dispatch(updateBdata(data));
    },
    getAllData: data => {
        dispatch(getData(data));
    },
    getAllBenchmarks: data => {
        dispatch(getBenchMarks(data))
    }
});

export default connect(null, mapDispatchToProps)(LoadingScreen)