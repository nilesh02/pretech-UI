import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SectionText from '../components/SectionText';
import SectionInput from '../components/SectionInput';
import {DAYS_HOURS_MINS_STRING, getDaysHrsMins, getNormalizedData, VARIABLES} from "../utils/utils";
import {connect} from "react-redux";
import SectionToggle from "../components/SectionToggle";
import DisplayLineChart from "../components/DisplayLineChart";

class ProjectionScreen extends Component {

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

        const P_ALT_001_DATA = [{
            data: this.props.GRAPH_P_ALT_001,
            color: (opacity = 1) => 'red',
        }]

        const P_ALT_002_DATA = [{
            data: this.props.GRAPH_P_ALT_002,
            color: (opacity = 1) => 'orange',
        }]

        const C_PARA_001_DATA = [{
            data: this.props.GRAPH_C_PARA_001,
            color: (opacity = 1) => 'blue',
        }]

        const combinedGraphData = [{
            data: getNormalizedData(this.props.GRAPH_P_ALT_001),
            color: (opacity = 1) => 'red',
        }, {
            data: getNormalizedData(this.props.GRAPH_P_ALT_002),
            color: (opacity = 1) => 'orange',
        }, {
            data: getNormalizedData(this.props.GRAPH_C_PARA_001),
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
                                      graphData={P_ALT_001_DATA}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Est. Time to Finish'}/>

                    <DisplayLineChart graphLabel={this.props.graphLabel}
                                      graphData={P_ALT_002_DATA}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Est. Amt. of Production'}/>

                    <DisplayLineChart graphLabel={this.props.graphLabel}
                                      graphData={C_PARA_001_DATA}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Current Production Rate'}
                                      color={'blue'}
                                      decimalPlaces={5}/>
                </ScrollView>


                <View style={styles.container}>
                    <SectionText label="Current Production Rate" value={this.props.C_PARA.C_PARA_001} unit="KG/hr"/>
                    <SectionText label="Est. Time to Finish" value={getDaysHrsMins(this.props.P_ALT.P_ALT_001)} unit={DAYS_HOURS_MINS_STRING}/>
                    <SectionText label="Est. Amt. of Production" value={this.props.P_ALT.P_ALT_002} unit="KG"/>
                </View>

                <View style={styles.container}>
                    <SectionInput label="Expected Rise in Rate-1" value={'0'} unit="%"/>
                    <SectionInput label="Expected Fall in Rate-1" value={'0'} unit="%"/>
                    <SectionText label="Proj. Time to Finish" value="CPara-006" unit={DAYS_HOURS_MINS_STRING}/>
                </View>

                <View style={styles.container}>
                    <SectionInput label="Expected Rise in Rate-2" value={'0'} unit="%"/>
                    <SectionInput label="Expected Fall in Rate-2" value={'0'} unit="%"/>
                    <SectionText label="Proj. Time to Finish" value="CPara-007" unit={DAYS_HOURS_MINS_STRING}/>
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
    C_PARA: state.C_PARA,
    P_ALT: state.P_ALT,
    graphLabel: state.graphLabel,
    GRAPH_P_ALT_001: state.GRAPH_P_ALT_001,
    GRAPH_P_ALT_002: state.GRAPH_P_ALT_002,
    GRAPH_C_PARA_001: state.GRAPH_C_PARA_001,
});

export default connect(mapStateToProps)(ProjectionScreen)