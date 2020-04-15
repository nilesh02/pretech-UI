import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import SectionText from '../components/SectionText';
import SectionInput from '../components/SectionInput';

export default class SettingsScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <SectionText label="NAME" value="Bdata-011" unit="" />
                    <SectionText label="Email-ID" value="Bdata-012" unit="" />
                    <SectionInput label="Mobile Number" value="Bdata-013" unit="" />
                    <SectionText label="Password" value="Bdata-014" unit="" />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    }
})