import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import SectionText from '../components/SectionText';
import SectionHeading from '../components/SectionHeading';
import SectionToggle from "../components/SectionToggle";
import TopSection from '../components/TopSection';
import {connect} from "react-redux";
import {VARIABLES} from "../utils/utils";
import {theme} from "../core/theme";
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTheme} from "victory-native";

const width = Dimensions.get('window').width
const heightOfGraph = 300;
const yAxisForTimeLabel = 290;
const yAxisForGraphLabel = 30;

class MaterialBalancePlantScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating: true,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({animating: false});
        }, 50);
    }

    render() {

        if (this.state.animating) {
            return (
                <View style={styles.containerLoader}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large"/>
                </View>

            );
        } else {

            return (
                <ScrollView style={{backgroundColor: theme.colors.backgroundColor}}>
                    <TopSection batchNumber={this.props.benchmarkRow[VARIABLES.DATA_001]}
                                ProductName={this.props.benchmarkRow[VARIABLES.DATA_002]}
                                OfficeInCharge={this.props.benchmarkRow[VARIABLES.DATA_011]}>
                    </TopSection>


                    <View style={styles.container}>
                        <View style={{backgroundColor: '#ffffff', paddingLeft: 15}}>

                            <View style={{marginLeft: width * 0.5, marginBottom: -40, marginTop: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={getStyleSheetForGraph("green").graphContainer}></View>
                                    <Text>RM Consumed</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={getStyleSheetForGraph("blue").graphContainer}></View>
                                    <Text>Product Recovered</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={getStyleSheetForGraph("orange").graphContainer}></View>
                                    <Text>Effluent to ETP</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={getStyleSheetForGraph("green").graphContainer}></View>
                                    <Text>Matl. In Process</Text>
                                </View>
                            </View>

                            <VictoryChart theme={VictoryTheme.material} width={width * 0.9}>
                                <VictoryGroup offset={20}
                                              colorScale={["yellow", "blue", "orange", "green"]}
                                >
                                    <VictoryBar
                                        data={this.props.BAR_GRAPH_PARA_001}
                                    />
                                    <VictoryBar
                                        data={this.props.BAR_GRAPH_PARA_010}
                                    />
                                    <VictoryBar
                                        data={this.props.BAR_GRAPH_PARA_012}
                                    />
                                    <VictoryBar
                                        data={this.props.BAR_GRAPH_C_PARA_008}
                                    />
                                </VictoryGroup>
                            </VictoryChart>


                        </View>
                    </View>

                    <View style={styles.container}>
                        <SectionHeading heading="Last One Hour"/>
                        <SectionText label="RM Consumed" value={this.props.LAST_ONE_HR_PARA_001} unit="KG"/>
                        <SectionText label="Product Recovered" value={this.props.LAST_ONE_HR_PARA_010} unit="KG"/>
                        <SectionText label="Effluent to ETP" value={this.props.LAST_ONE_HR_PARA_012} unit="kG"/>
                        <SectionText label="Matl. In Process" value={this.props.LAST_ONE_HR_C_PARA_008} unit="kG"/>
                    </View>

                    <View style={styles.container}>
                        <SectionHeading heading="Current Shift"/>
                        <SectionText label="RM Consumed" value={this.props.SHIFT_PARA_001} unit="KG"/>
                        <SectionText label="Product Recovered" value={this.props.SHIFT_PARA_010} unit="KG"/>
                        <SectionText label="Effluent to ETP" value={this.props.SHIFT_PARA_012} unit="kG"/>
                        <SectionText label="Matl. In Process" value={this.props.SHIFT_C_PARA_008} unit="kG"/>
                    </View>

                    <View style={styles.container}>
                        <SectionHeading heading="Current Batch"/>
                        <SectionText label="RM Consumed" value={this.props.BATCH_PARA_001} unit="KG"/>
                        <SectionText label="Product Recovered" value={this.props.BATCH_PARA_010} unit="KG"/>
                        <SectionText label="Effluent to ETP" value={this.props.BATCH_PARA_012} unit="kG"/>
                        <SectionText label="Matl. In Process" value={this.props.BATCH_C_PARA_008} unit="kG"/>
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
        elevation: 5,
        alignSelf: 'center',
        width: '95%',
        borderRadius: 15,
        overflow: 'hidden'
    },
    containerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const getStyleSheetForGraph = (backgroundColor) => {
    return StyleSheet.create({
        graphContainer: {
            backgroundColor: backgroundColor,
            width: 10,
            height: 10,
            marginRight: 4
        }
    })
}

const mapStateToProps = state => ({
    currentRow: state.currentRow,
    benchmarkRow: state.benchmarkRow,
    productRecovered: state.productRecovered,
    rmConsumed: state.rmConsumed,
    effluentToETP: state.effluentToETP,
    graphLabel: state.graphLabel,
    C_PARA: state.C_PARA,
    GRAPH_C_PARA_008: state.GRAPH_C_PARA_008,
    LAST_ONE_HR_PARA_001: state.LAST_ONE_HR_PARA_001,
    LAST_ONE_HR_PARA_010: state.LAST_ONE_HR_PARA_010,
    LAST_ONE_HR_PARA_012: state.LAST_ONE_HR_PARA_012,
    LAST_ONE_HR_C_PARA_008: state.LAST_ONE_HR_C_PARA_008,
    SHIFT_PARA_001: state.SHIFT_PARA_001,
    SHIFT_PARA_010: state.SHIFT_PARA_010,
    SHIFT_PARA_012: state.SHIFT_PARA_012,
    SHIFT_C_PARA_008: state.SHIFT_C_PARA_008,
    BATCH_PARA_001: state.BATCH_PARA_001,
    BATCH_PARA_010: state.BATCH_PARA_010,
    BATCH_PARA_012: state.BATCH_PARA_012,
    BATCH_C_PARA_008: state.BATCH_C_PARA_008,
    BAR_GRAPH_PARA_001: state.BAR_GRAPH_PARA_001,
    BAR_GRAPH_PARA_010: state.BAR_GRAPH_PARA_010,
    BAR_GRAPH_PARA_012: state.BAR_GRAPH_PARA_012,
    BAR_GRAPH_C_PARA_008: state.BAR_GRAPH_C_PARA_008,
});

export default connect(mapStateToProps)(MaterialBalancePlantScreen)
