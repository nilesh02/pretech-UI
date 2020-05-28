import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, View,Text,ActivityIndicator} from 'react-native';
import SectionText from '../components/SectionText';
import SectionInputDropDown from '../components/SectionInputDropDown';
import {DAYS_HOURS_MINS_STRING, getDaysHrsMins, VARIABLES} from "../utils/utils";
import {connect} from "react-redux";
import SectionToggle from "../components/SectionToggle";
import {VictoryChart, VictoryLabel, VictoryLine, VictoryTheme} from "victory-native";


const width = Dimensions.get('window').width
const heightOfGraph = 300;
const yAxisForTimeLabel = 290;
const yAxisForGraphLabel = 30;
const EXPECTED_RISE_OR_FALL_RATE1 = "Expected Rise" + " or " + "\n" + "Fall in Rate-1";
const EXPECTED_RISE_OR_FALL_RATE2 = "Expected Rise" + " or " + "\n" + "Fall in Rate-2";

class ProjectionScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleHorizontal: true,
            B_DATA_005:0,
            B_DATA_006:0,
            C_PARA_006:this.props.P_ALT.P_ALT_001,
            C_PARA_007:this.props.P_ALT.P_ALT_001,
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

    onChangeB_Data_005(value,dropDownValue) {
        // console.log(value,dropDownValue);
        if(dropDownValue==='Rise'){
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/value)/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 + (value / 100))
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 })
            }
        } else {
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/(value*-1))/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 - (value / 100))
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 })
            }
        }
    }

    onChangeB_Data_006(value,dropDownValue) {
        if(dropDownValue==='Rise'){
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/value)/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 + (value / 100))
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 })
            }
        } else {
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/(value*-1))/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 - (value / 100))
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 })
            }
        }
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


                                <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                                    <VictoryChart
                                        theme={VictoryTheme.material} height={heightOfGraph} >
                                        <VictoryLabel text="Combined Graph" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                        <VictoryLine
                                            style={{
                                                data: {stroke: "blue"},
                                                parent: {border: "1px solid #ccc"}
                                            }}
                                            data={this.props.normalizedGRAPH_P_ALT_001}
                                        />
                                        <VictoryLine
                                            style={{
                                                data: {stroke: "orange"},
                                                parent: {border: "1px solid #ccc"}
                                            }}
                                            data={this.props.normalizedGRAPH_P_ALT_002}
                                        />
                                        <VictoryLine
                                            style={{
                                                data: {stroke: "red"},
                                                parent: {border: "1px solid #ccc"}
                                            }}
                                            data={this.props.normalizedGRAPH_C_PARA_001}
                                        />
                                        <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                                    </VictoryChart>
                                </View>

                                <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                                    <VictoryChart theme={VictoryTheme.material} height={heightOfGraph}>
                                        <VictoryLabel text="Current Production Rate" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                        <VictoryLine
                                            style={{
                                                data: {stroke: "red"},
                                                parent: {border: "1px solid #ccc"}
                                            }}
                                            data={this.props.GRAPH_C_PARA_001}
                                        />
                                        <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                                    </VictoryChart>
                                </View>

                                <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                                    <VictoryChart theme={VictoryTheme.material} height={heightOfGraph} >
                                        <VictoryLabel text="Est. Time to Finish" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                        <VictoryLine
                                            style={{
                                                data: {stroke: "orange"},
                                                parent: {border: "1px solid #ccc"}
                                            }}
                                            data={this.props.GRAPH_P_ALT_001}
                                        />
                                        <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                                    </VictoryChart>
                                </View>

                                <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>
                                    <VictoryChart theme={VictoryTheme.material} height={heightOfGraph}>
                                        <VictoryLabel text="Est. Amt. of Production" x={width * 0.5} y={yAxisForGraphLabel} textAnchor="middle"/>
                                        <VictoryLine
                                            style={{
                                                data: {stroke: "green"},
                                                parent: {border: "1px solid #ccc"}
                                            }}
                                            data={this.props.GRAPH_P_ALT_002}
                                        />
                                        <VictoryLabel text="Time (in minutes)" x={width * 0.5} y={yAxisForTimeLabel} textAnchor="middle"/>
                                    </VictoryChart>
                                </View>
                            </ScrollView>


                            <View style={styles.container}>
                                <SectionText label="Current Production Rate" value={this.props.C_PARA.C_PARA_001} unit="KG/hr"/>
                                <SectionText label="Est. Time to Finish" value={getDaysHrsMins(this.props.P_ALT.P_ALT_001)} unit={DAYS_HOURS_MINS_STRING}/>
                                <SectionText label="Est. Amt. of Production" value={this.props.P_ALT.P_ALT_002} unit="KG"/>
                            </View>

                            <View style={styles.container}>
                                <SectionInputDropDown label={EXPECTED_RISE_OR_FALL_RATE1} value={this.state.B_DATA_005} unit="%" onChangeHandler={this.onChangeB_Data_005.bind(this)}/>
                                <SectionText label="Proj. Time to Finish" value={getDaysHrsMins(this.state.C_PARA_006)} unit={DAYS_HOURS_MINS_STRING}/>
                            </View>

                            <View style={styles.container}>
                                <SectionInputDropDown label={EXPECTED_RISE_OR_FALL_RATE2} value={this.state.B_DATA_006} unit="%" onChangeHandler={this.onChangeB_Data_006.bind(this)}/>
                                <SectionText label="Proj. Time to Finish" value={getDaysHrsMins(this.state.C_PARA_007)} unit={DAYS_HOURS_MINS_STRING}/>
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
    containerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    normalizedGRAPH_P_ALT_001: state.normalizedGRAPH_P_ALT_001,
    normalizedGRAPH_P_ALT_002: state.normalizedGRAPH_P_ALT_002,
    normalizedGRAPH_C_PARA_001: state.normalizedGRAPH_C_PARA_001,
});

export default connect(mapStateToProps)(ProjectionScreen)
