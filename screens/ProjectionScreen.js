import React, { Component } from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';
import * as firebase from 'firebase';
import DisplayBarChart from '../components/DisplayBarChart';
import SectionText from '../components/SectionText';
import SectionInput from '../components/SectionInput';

export default class ProjectionScreen extends Component {
    render() {
        return (
            <ScrollView>
            <DisplayBarChart/>
            <View style={styles.container}>
                <SectionText label="Batch Number" value="Data-001" unit=""/>
                <SectionText label="Product" value="Data-002" unit=""/>
                <SectionText label="Officer In-charge" value="Data-011" unit=""/>
            </View>
            <View style={styles.container}>
                <SectionText label="Current Production Rate" value="CPara-001" unit="KG/hr"/>
                <SectionText label="Est. Time to Finish" value="PAlt-001" unit="days/hrs/min"/>
                <SectionText label="Est. Amt. of Production" value="PAlt-002" unit="KG"/>
            </View>

            <View style={styles.container}>
                <SectionInput label="Expected Rise/Fall in Rate-1" value="Bdata-005" unit="%"/>
                <SectionText label="Proj. Time to Finish" value="CPara-006" unit="days/hrs/min" />
            </View>

            <View style={styles.container}>
                <SectionInput label="Expected Rise/Fall in Rate-2" value="Bdata-006" unit="%"/>
                <SectionText label="Proj. Time to Finish" value="CPara-007" unit="days/hrs/min"/>
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