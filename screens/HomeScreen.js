import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as d3 from 'd3';
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';
import {getBenchMarks, getData} from '../actions/actions'
import {connect} from 'react-redux';
import {VARIABLES} from "../utils/utils";

class HomeScreen extends Component {

    componentDidMount() {
        firebase.storage().ref('benchmark.csv').getDownloadURL().then(function (url) {
            d3.csv(url).then(function (result) {
                this.props.getAllBenchmarks(result);
                firebase.storage().ref('data.csv').getDownloadURL().then(function (url) {
                    d3.csv(url).then(function (result) {
                        this.props.getAllData(result);
                    }.bind(this))
                }.bind(this));
            }.bind(this))
        }.bind(this));
    }

    render() {
        return (
            <ScrollView>
                <ScrollView horizontal={true}>
                    <DisplayLineChart graphLabel={this.props.graphLabel} graphData={this.props.productRecovered}/>
                    <DisplayLineChart graphLabel={this.props.graphLabel} graphData={this.props.rmConsumed}/>
                    <DisplayLineChart graphLabel={this.props.graphLabel} graphData={this.props.energyConsumed}/>

                </ScrollView>
                <View style={styles.container}>
                    <SectionText label="Batch Number" value={this.props.benchmarkRow[VARIABLES.DATA_001]} unit=""/>
                    <SectionText label="Product" value={this.props.benchmarkRow[VARIABLES.DATA_002]} unit=""/>
                    <SectionText label="Officer In-charge" value={this.props.benchmarkRow[VARIABLES.DATA_011]} unit=""/>
                </View>
                <View style={styles.container}>
                    <SectionText label="Product Recovered" value={this.props.currentRow[VARIABLES.PARA_010]} unit="KG"/>
                    <SectionText label="RM Consumed" value={this.props.currentRow[VARIABLES.PARA_001]} unit="KG"/>
                    <SectionText label="Energy Consumed" value={this.props.currentRow[VARIABLES.PARA_009]} unit="KWH"/>
                </View>

                <View style={styles.container}>
                    <SectionText label="Est. Time to Finish" value={this.props.C_PARA.C_PARA_005} unit="days/hrs/min"/>
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