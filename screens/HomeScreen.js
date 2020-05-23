import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as d3 from 'd3';
import BackgroundFetch from "react-native-background-fetch";
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';
import {getBenchMarks, getData} from '../actions/actions'
import {connect} from 'react-redux';
import {DAYS_HOURS_MINS_STRING, getDaysHrsMins, getNormalizedData, VARIABLES} from "../utils/utils";
import SectionToggle from "../components/SectionToggle";
// const functions = require('firebase-functions');

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleHorizontal: true
        };
    }

    componentDidMount() {
                
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

        const energyConsumedData = [{
            data: this.props.energyConsumed,
            color: (opacity = 1) => 'blue',
        }]

        const combinedGraphData = [{
            data: getNormalizedData(this.props.productRecovered),
            color: (opacity = 1) => 'red',
        }, {
            data: getNormalizedData(this.props.rmConsumed),
            color: (opacity = 1) => 'orange',
        }, {
            data: getNormalizedData(this.props.energyConsumed),
            color: (opacity = 1) => 'blue',
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

                    <DisplayLineChart graphLabel={this.props.graphLabel}
                                      graphData={productsRecoveredData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Product Recovered'}/>

                    <DisplayLineChart graphLabel={this.props.graphLabel}
                                      graphData={rmConsumedData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'RM Consumed'}/>

                    <DisplayLineChart graphLabel={this.props.graphLabel}
                                      graphData={energyConsumedData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Energy Consumed'}
                                      color={'blue'}/>
                </ScrollView>

                <View style={styles.container}>
                    <SectionText label="Product Recovered" value={this.props.currentRow[VARIABLES.PARA_010]} unit="KG"/>
                    <SectionText label="RM Consumed" value={this.props.currentRow[VARIABLES.PARA_001]} unit="KG"/>
                    <SectionText label="Energy Consumed" value={this.props.currentRow[VARIABLES.PARA_009]} unit="KWH"/>
                </View>

                <View style={styles.container}>
                    <SectionText label="Est. Time to Finish" value={getDaysHrsMins(this.props.C_PARA.C_PARA_005)}
                                 unit={DAYS_HOURS_MINS_STRING}/>
                    <SectionText label="Est. Cost of Batch" value="Rs." unit={this.props.C_PARA.C_PARA_002}/>
                </View>

                <View style={styles.container}>
                    <SectionText label="Current Production Rate" value={this.props.C_PARA.C_PARA_001} unit="KG/hr"/>
                    <SectionText label="Est. Amt. of Production" value={this.props.P_ALT.P_ALT_002} unit="kG"/>
                    <SectionText label="Target Production" value={this.props.C_PARA.C_PARA_003} unit="kG"/>
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
    },
    graphContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 0

    }
})

const mapStateToProps = state => ({
    currentRow: state.currentRow,
    benchmarkRow: state.benchmarkRow,
    productRecovered: state.productRecovered,
    rmConsumed: state.rmConsumed,
    energyConsumed: state.energyConsumed,
    graphLabel: state.graphLabel,
    C_PARA: state.C_PARA,
    P_ALT: state.P_ALT,
});

const mapDispatchToProps = dispatch => ({
    getAllData: data => {
        dispatch(getData(data));
    },
    getAllBenchmarks: data => {
        dispatch(getBenchMarks(data))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)