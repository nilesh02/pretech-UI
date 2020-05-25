import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';
import {connect} from 'react-redux';
import {DAYS_HOURS_MINS_STRING, getDaysHrsMins, getNormalizedData, VARIABLES} from "../utils/utils";
import SectionToggle from "../components/SectionToggle";
import { VictoryLine,VictoryChart,VictoryTheme,VictoryLabel } from "victory-native";

class HomeScreen extends Component {

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

        const energyConsumedData = [{
            data: this.props.energyConsumed,
            color: (opacity = 1) => 'blue',
        }]

        // const combinedGraphData = [{
        //     data: getNormalizedData(this.props.productRecovered),
        //     color: (opacity = 1) => 'red',
        // }, {
        //     data: getNormalizedData(this.props.rmConsumed),
        //     color: (opacity = 1) => 'orange',
        // }, {
        //     data: getNormalizedData(this.props.energyConsumed),
        //     color: (opacity = 1) => 'blue',
        // }]


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
                <View style={{backgroundColor:'#ffffff',paddingLeft:15}}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                    <VictoryLabel text="PRODUCT RECOVERED" x={'50%'} y={30} textAnchor="middle"/>
                    <VictoryLine
                        style={{
                        data: {stroke: "#c43a31"},
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                            {x:0 , y:13742},
                            {x:5 , y:13797},
                            {x:10 , y:13853},
                            {x:15 , y:13909},
                            {x:20 , y:13964},
                            {x:25 , y:14020},
                            {x:30 , y:14076},
                            {x:35 , y:14131},
                            {x:40 , y:14187},
                            {x:45 , y:14243},
                            {x:50 , y:14298},
                            {x:55 , y:14358}
                        ]
                    }
                    />
                    </VictoryChart>
                </View>
                    {/* <DisplayLineChart graphLabel={this.props.graphLabel}
                                      graphData={combinedGraphData}
                                      xAxisLabel={'Time (in minutes)'}
                                      graphName={'Combined Graph'}/> */}

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


export default connect(mapStateToProps, null)(HomeScreen)
