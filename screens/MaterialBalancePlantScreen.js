import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';
import SectionHeading from '../components/SectionHeading';
import {connect} from "react-redux";
import {VARIABLES} from "../utils/utils";

class MaterialBalancePlantScreen extends Component {
    render() {
        return (
            <ScrollView>
                <ScrollView horizontal={true}>

                    <DisplayLineChart graphLabel={this.props.graphLabel} graphData={this.props.productRecovered}/>
                    <DisplayLineChart graphLabel={this.props.graphLabel} graphData={this.props.rmConsumed}/>
                    <DisplayLineChart graphLabel={this.props.graphLabel} graphData={this.props.effluentToETP}/>

                </ScrollView>
                <View style={styles.container}>
                    <SectionText label="Batch Number" value={this.props.benchmarkRow[VARIABLES.DATA_001]} unit=""/>
                    <SectionText label="Product" value={this.props.benchmarkRow[VARIABLES.DATA_002]} unit=""/>
                    <SectionText label="Officer In-charge" value={this.props.benchmarkRow[VARIABLES.DATA_011]} unit=""/>
                </View>
                <View style={styles.container}>
                    <SectionHeading heading="Last One Hour"/>
                    <SectionText label="RM Consumed" value={this.props.currentRow[VARIABLES.PARA_001]} unit="KG"/>
                    <SectionText label="Product Recovered" value={this.props.currentRow[VARIABLES.PARA_010]} unit="KG"/>
                    <SectionText label="Effluent to ETP" value={this.props.currentRow[VARIABLES.PARA_012]} unit="kG"/>
                    <SectionText label="Matl. In Process" value={this.props.C_PARA.C_PARA_008} unit="kG"/>
                </View>

                <View style={styles.container}>
                    <SectionHeading heading="Current Shift"/>
                    <SectionText label="RM Consumed" value={this.props.currentRow[VARIABLES.PARA_001]} unit="KG"/>
                    <SectionText label="Product Recovered" value={this.props.currentRow[VARIABLES.PARA_010]} unit="KG"/>
                    <SectionText label="Effluent to ETP" value={this.props.currentRow[VARIABLES.PARA_012]} unit="kG"/>
                    <SectionText label="Matl. In Process" value={this.props.C_PARA.C_PARA_008} unit="kG"/>
                </View>

                <View style={styles.container}>
                    <SectionHeading heading="Current Batch"/>
                    <SectionText label="RM Consumed" value={this.props.currentRow[VARIABLES.PARA_001]} unit="KG"/>
                    <SectionText label="Product Recovered" value={this.props.currentRow[VARIABLES.PARA_010]} unit="KG"/>
                    <SectionText label="Effluent to ETP" value={this.props.currentRow[VARIABLES.PARA_012]} unit="kG"/>
                    <SectionText label="Matl. In Process" value={this.props.C_PARA.C_PARA_008} unit="kG"/>
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
    productRecovered: state.productRecovered,
    rmConsumed: state.rmConsumed,
    effluentToETP: state.effluentToETP,
    graphLabel: state.graphLabel,
    C_PARA: state.C_PARA,
});

export default connect(mapStateToProps)(MaterialBalancePlantScreen)