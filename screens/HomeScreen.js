import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Dimensions,Text,ActivityIndicator} from 'react-native';
import SectionText from '../components/SectionText';
import TopSection from '../components/TopSection';
import {connect} from 'react-redux';
import {DAYS_HOURS_MINS_STRING, getDaysHrsMins, getNormalizedData, VARIABLES} from "../utils/utils";
import SectionToggle from "../components/SectionToggle";
import {VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis} from "victory-native";

const width = Dimensions.get('window').width
const heightOfGraph = 300;
const yAxisForTimeLabel = 290;
const yAxisForGraphLabel = 30;

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleHorizontal: true,
            animating:true,
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({animating:false});
        },50);
    }

    onChangeSwitch(switchValue) {
        this.setState({toggleHorizontal: !switchValue})
    }

    render() {

        if(this.state.animating){
            return (
                <View style={styles.containerLoader}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large"/>
                </View>

            );
        } else{

            return (
                <ScrollView>
                    <TopSection batchNumber={this.props.benchmarkRow[VARIABLES.DATA_001]}
                                ProductName={this.props.benchmarkRow[VARIABLES.DATA_002]}
                                OfficeInCharge={this.props.benchmarkRow[VARIABLES.DATA_011]}>
                    </TopSection>
                    <View style={styles.graphContainer}>
                        <SectionToggle label={'Graph Horizontal View:'}
                                    switchValue={this.state.toggleHorizontal}
                                    handleSwitchChange={this.onChangeSwitch.bind(this)}/>
                    </View>

                    <ScrollView horizontal={this.state.toggleHorizontal}>
                        <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                            <VictoryChart
                                theme={VictoryTheme.material} height={heightOfGraph} >
                                <VictoryLabel text="Combined Graph" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                <VictoryLine
                                    style={{
                                        data: {stroke: "blue"},
                                        parent: {border: "1px solid #ccc"}
                                    }}
                                    data={this.props.normalizedProductRecovered}
                                />
                                <VictoryLine
                                    style={{
                                        data: {stroke: "orange"},
                                        parent: {border: "1px solid #ccc"}
                                    }}
                                    data={this.props.normalizedRMConsumed}
                                />
                                <VictoryLine
                                    style={{
                                        data: {stroke: "red"},
                                        parent: {border: "1px solid #ccc"}
                                    }}
                                    data={this.props.normalizedEnergyConsumed}
                                />
                                <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                            </VictoryChart>
                        </View>

                        <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                            <VictoryChart theme={VictoryTheme.material} height={heightOfGraph}>
                                <VictoryLabel text="Product Recovered" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                <VictoryLine
                                    style={{
                                        data: {stroke: "red"},
                                        parent: {border: "1px solid #ccc"}
                                    }}
                                    data={this.props.productRecovered}
                                />
                                <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                            </VictoryChart>
                        </View>

                        <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                            <VictoryChart theme={VictoryTheme.material} height={heightOfGraph} >
                                <VictoryLabel text="RM Consumed" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                <VictoryLine
                                    style={{
                                        data: {stroke: "orange"},
                                        parent: {border: "1px solid #ccc"}
                                    }}
                                    data={this.props.rmConsumed}
                                />
                                <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                            </VictoryChart>
                        </View>

                        <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                            <VictoryChart theme={VictoryTheme.material} height={heightOfGraph}>
                                <VictoryLabel text="Energy Consumed" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                <VictoryLine
                                    style={{
                                        data: {stroke: "green"},
                                        parent: {border: "1px solid #ccc"}
                                    }}
                                    data={this.props.energyConsumed}
                                />
                                <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                            </VictoryChart>
                        </View>

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

    },
    containerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    normalizedRMConsumed: state.normalizedRMConsumed,
    normalizedProductRecovered: state.normalizedProductRecovered,
    normalizedEnergyConsumed: state.normalizedEnergyConsumed
});


export default connect(mapStateToProps, null)(HomeScreen)
