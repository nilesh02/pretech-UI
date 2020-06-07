import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import SectionText from '../components/SectionText';
import SectionInputAdmin from '../components/SectionInputAdmin';
import Button from '../components/Button';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/utils';
import {theme} from "../core/theme";

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating: true,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({animating: false});
        }, 50);
    }

    updateBdata() {
        console.log("inside update data")
        //    console.log(this.props.BDATA_001,this.props.BDATA_002,this.props.BDATA_003,this.props.BDATA_004);
        const firestore = firebase.firestore();
        firestore.collection("collections").doc("documents").update({
            BDATA_001: parseFloat(this.props.BDATA_001),
            BDATA_002: parseFloat(this.props.BDATA_002),
            BDATA_003: parseFloat(this.props.BDATA_003),
            BDATA_004: parseFloat(this.props.BDATA_004),
        }).then(alert('Variables Updated'));
    }

    logout() {
        console.log("inside logout")
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('LoginScreen'))
    }

    render() {
        if (this.state.animating) {
            return (
                <View style={styles.containerLoader}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large"/>
                </View>

            );
        } else {

            return (
                <ScrollView style={{marginTop: 50, backgroundColor: theme.colors.backgroundColor}}>
                    <View style={styles.container}>
                        <SectionText label="NAME" value="Bdata-011" unit=""/>
                        <SectionText label="Email-ID" value="Bdata-012" unit=""/>
                        <SectionText label="Mobile Number" value="Bdata-013" unit=""/>
                        <SectionText label="Password" value="Bdata-014" unit=""/>
                    </View>

                    <View style={styles.buttonContainer}>
                    <Button  mode="contained" onPress={this.logout.bind(this)}> Log Out </Button>
                    </View>

                    <View style={styles.container}>
                        <SectionInputAdmin label="Rs/kG - RM" value={this.props.BDATA_001} unit="" Bdata={VARIABLES.BDATA_001}/>
                        <SectionInputAdmin label="Rs/kG - Solvent" value={this.props.BDATA_002} unit="" Bdata={VARIABLES.BDATA_002}/>
                        <SectionInputAdmin label="Rs/kG - Fuel" value={this.props.BDATA_003} unit="" Bdata={VARIABLES.BDATA_003}/>
                        <SectionInputAdmin label="Rs/kWH  Elect." value={this.props.BDATA_004} unit="" Bdata={VARIABLES.BDATA_004}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button mode="contained" onPress={this.updateBdata.bind(this)}> Update </Button>
                    </View>

                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        elevation: 5,
        alignSelf: 'center',
        width: '95%',
        borderRadius: 7,
        overflow: 'hidden'
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        borderRadius: 20,
        overflow: 'hidden'
    }
})

const mapStateToProps = state => ({
    BDATA_001: state.BDATA_001,
    BDATA_002: state.BDATA_002,
    BDATA_003: state.BDATA_003,
    BDATA_004: state.BDATA_004,
});

export default connect(mapStateToProps)(SettingsScreen)
