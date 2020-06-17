import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {VictoryChart, VictoryLabel, VictoryLine, VictoryTheme} from "victory-native";

import {connect} from 'react-redux';
import {GraphStyles} from "./GraphStyles";

const width = Dimensions.get('window').width
const heightOfGraph = 300;
const yAxisForTimeLabel = 290;
const yAxisForGraphLabel = 30;

class ProjectionScreenCombinedGraph extends Component {

    render() {

        return (
            <View style={GraphStyles.container}>
                <VictoryChart theme={VictoryTheme.material} height={heightOfGraph} width={width*0.9}>
                    <VictoryLabel text="Combined Graph" x={width * 0.45} y={yAxisForGraphLabel} textAnchor="middle"/>
                    <VictoryLine
                        style={{
                            data: {stroke: "blue"},
                            parent: {border: "1px solid #ccc"}
                        }}
                        data={this.props.normalizedGRAPH_P_ALT_001}
                    />
                    <VictoryLine
                        style={{
                            data: {stroke: "green"},
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
                    <VictoryLabel text="Time (in minutes)" x={width * 0.45} y={yAxisForTimeLabel} textAnchor="middle"/>
                </VictoryChart>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    normalizedGRAPH_P_ALT_001: state.normalizedGRAPH_P_ALT_001,
    normalizedGRAPH_P_ALT_002: state.normalizedGRAPH_P_ALT_002,
    normalizedGRAPH_C_PARA_001: state.normalizedGRAPH_C_PARA_001,
});


export default connect(mapStateToProps, null)(ProjectionScreenCombinedGraph)
