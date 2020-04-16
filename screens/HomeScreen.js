import React, { Component } from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';
import * as firebase from 'firebase';
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';

export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView>
                <ScrollView horizontal={true} >
                    <DisplayLineChart/>
                    <DisplayLineChart/>
                </ScrollView>
                <View style={styles.container}>
                    <SectionText label="Batch Number" value="Data-001" unit=""/>
                    <SectionText label="Product" value="Data-002" unit=""/>
                    <SectionText label="Officer In-charge" value="Data-011" unit=""/>
                </View>
                <View style={styles.container}>
                    <SectionText label="Product Recovered" value="Para-010" unit="KG"/>
                    <SectionText label="RM Consumed" value="Para-001" unit="KG"/>
                    <SectionText label="Energy Consumed" value="Para-019" unit="KWH"/>
                </View>

                <View style={styles.container}>
                    <SectionText label="Est. Time to Finish" value="Cpara-005" unit="days/hrs/min"/>
                    <SectionText label="Est. Cost of Batch" value="Rs." unit="Cpara-002"/>
                </View>

                <View style={styles.container}>
                    <SectionText label="Current Production Rate" value="Cpara-001" unit="KG/hr"/>
                    <SectionText label="Est. Amt. of Production" value="PAlt-002" unit="kG"/>
                    <SectionText label="Target Production" value="CPara-003" unit="kG"/>
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
        marginVertical:10,
    },
})