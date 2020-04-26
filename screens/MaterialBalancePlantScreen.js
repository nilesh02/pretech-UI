import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DisplayBarChart from '../components/DisplayBarChart';
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';
import SectionHeading from '../components/SectionHeading';
import SectionToggle from "../components/SectionToggle";
import {connect} from "react-redux";
import {getNormalizedData, VARIABLES} from "../utils/utils";

class MaterialBalancePlantScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleHorizontal: true
        };
    }

    onChangeSwitch(switchValue) {
        this.setState({toggleHorizontal: !switchValue})
    }

    render() {

        const productsRecoveredData = [{
            data: this.props.productRecovered,
            color: (opacity = 1) => 'red',
        }]

        const rmConsumedData = [{
            data: this.props.rmConsumed,
            color: (opacity = 1) => 'orange',
        }]

        const effluentToETPData = [{
            data: this.props.effluentToETP,
            color: (opacity = 1) => 'blue',
        }]

        const C_PARA_008_DATA = [{
            data: this.props.GRAPH_C_PARA_008,
            color: (opacity = 1) => 'black',
        }]

        const combinedGraphData = [{
            data: getNormalizedData(this.props.productRecovered),
            color: (opacity = 1) => 'red',
        }, {
            data: getNormalizedData(this.props.rmConsumed),
            color: (opacity = 1) => 'orange',
        }, {
            data: getNormalizedData(this.props.effluentToETP),
            color: (opacity = 1) => 'blue',
        }, {
            data: getNormalizedData(this.props.GRAPH_C_PARA_008),
            color: (opacity = 1) => 'black',
        }]

        return (
            <ScrollView>
                <View style={styles.container}>
                    <SectionText label="Batch Number" value={this.props.benchmarkRow[VARIABLES.DATA_001]} unit=""/>
                    <SectionText label="Product" value={this.props.benchmarkRow[VARIABLES.DATA_002]} unit=""/>
                    <SectionText label="Officer In-charge" value={this.props.benchmarkRow[VARIABLES.DATA_011]} unit=""/>
                </View>

                <View style={styles.graphContainer}>
                    <SectionToggle label={'Graph Horizontal View:'}
                                   switchValue={this.state.toggleHorizontal}
                                   handleSwitchChange={this.onChangeSwitch.bind(this)}/>
                </View>

                <ScrollView horizontal={this.state.toggleHorizontal}>

                    <DisplayLineChart graphLabel={this.props.graphLabel}
                                      graphData={combinedGraphData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Combined Graph'}/>

                    <DisplayBarChart graphLabel={this.props.graphLabel}
                                      graphData={productsRecoveredData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Product Recovered'}/>

                    <DisplayBarChart graphLabel={this.props.graphLabel}
                                      graphData={rmConsumedData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'RM Consumed'}/>

                    <DisplayBarChart graphLabel={this.props.graphLabel}
                                      graphData={effluentToETPData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Effluent to ETP'}/>

                    <DisplayBarChart graphLabel={this.props.graphLabel}
                                      graphData={C_PARA_008_DATA}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Matl. In Process'}/>
                </ScrollView>
                
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
    GRAPH_C_PARA_008: state.GRAPH_C_PARA_008,
});

export default connect(mapStateToProps)(MaterialBalancePlantScreen)