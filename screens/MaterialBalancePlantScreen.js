import React, { Component } from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';
import * as firebase from 'firebase';
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';
import SectionHeading from '../components/SectionHeading';

export default class MaterialBalancePlantScreen extends Component {
    render() {
        return (
            <ScrollView>
            <DisplayLineChart/>
            <View style={styles.container}>
                <SectionText label="Batch Number" value="Data-001" unit=""/>
                <SectionText label="Product" value="Data-002" unit=""/>
                <SectionText label="Officer In-charge" value="Data-011" unit=""/>
            </View>
            <View style={styles.container}>
                <SectionHeading heading="Last One Hour" />
                <SectionText label="RM Consumed" value="Para-001" unit="KG"/>
                <SectionText label="Product Recovered" value="Para-010" unit="KG"/>
                <SectionText label="Effluent to ETP" value="Para-012" unit="kG"/>
                <SectionText label="Matl. In Process" value="Cpara-008" unit="kG"/>
            </View>

            <View style={styles.container}>
                <SectionHeading heading="Current Shift" />
                <SectionText label="RM Consumed" value="Para-001" unit="KG"/>
                <SectionText label="Product Recovered" value="Para-010" unit="KG"/>
                <SectionText label="Effluent to ETP" value="Para-012" unit="kG"/>
                <SectionText label="Matl. In Process" value="Cpara-008" unit="kG"/>
            </View>

            <View style={styles.container}>
                <SectionHeading heading="Current Batch" />
                <SectionText label="RM Consumed" value="Para-001" unit="KG"/>
                <SectionText label="Product Recovered" value="Para-010" unit="KG"/>
                <SectionText label="Effluent to ETP" value="Para-012" unit="kG"/>
                <SectionText label="Matl. In Process" value="Cpara-008" unit="kG"/>
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
    }
})