import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DisplayBarChart from '../components/DisplayBarChart';
import SectionText from '../components/SectionText';
import SectionInput from '../components/SectionInput';
import {VARIABLES} from "../utils/utils";
import {connect} from "react-redux";

class ProjectionScreen extends Component {
    render() {
        return (
            <ScrollView>
                <DisplayBarChart/>
                <View style={styles.container}>
                    <SectionText label="Batch Number" value={this.props.benchmarkRow[VARIABLES.DATA_001]} unit=""/>
                    <SectionText label="Product" value={this.props.benchmarkRow[VARIABLES.DATA_002]} unit=""/>
                    <SectionText label="Officer In-charge" value={this.props.benchmarkRow[VARIABLES.DATA_011]} unit=""/>
                </View>
                <View style={styles.container}>
                    <SectionText label="Current Production Rate" value="CPara-001" unit="KG/hr"/>
                    <SectionText label="Est. Time to Finish" value="PAlt-001" unit="days/hrs/min"/>
                    <SectionText label="Est. Amt. of Production" value="PAlt-002" unit="KG"/>
                </View>

                <View style={styles.container}>
                    <SectionInput label="Expected Rise in Rate-1" value={'0'} unit="%"/>
                    <SectionInput label="Expected Fall in Rate-1" value={'0'} unit="%"/>
                    <SectionText label="Proj. Time to Finish" value="CPara-006" unit="days/hrs/min"/>
                </View>

                <View style={styles.container}>
                    <SectionInput label="Expected Rise in Rate-2" value={'0'} unit="%"/>
                    <SectionInput label="Expected Fall in Rate-2" value={'0'} unit="%"/>
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
        marginVertical: 10,
    }
})

const mapStateToProps = state => ({
    currentRow: state.currentRow,
    benchmarkRow: state.benchmarkRow,
    BDATA_005: state.BDATA_005,
    BDATA_006: state.BDATA_006,
});

export default connect(mapStateToProps)(ProjectionScreen)