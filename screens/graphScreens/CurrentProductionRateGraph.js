import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {VictoryChart, VictoryLabel, VictoryLine, VictoryTheme} from "victory-native";

import {connect} from 'react-redux';
import {GraphStyles} from "./GraphStyles";

const width = Dimensions.get('window').width
const heightOfGraph = 300;
const yAxisForTimeLabel = 290;
const yAxisForGraphLabel = 30;

class CurrentProductionRateGraph extends Component {

    render() {

        return (
            <View style={GraphStyles.container}>
                <VictoryChart theme={VictoryTheme.material} height={heightOfGraph} width={width*0.9}>
                    <VictoryLabel text="Current Production Rate" x={width * 0.45} y={yAxisForGraphLabel} textAnchor="middle"/>
                    <VictoryLine
                        style={{
                            data: {stroke: "red"},
                            parent: {border: "1px solid #ccc"}
                        }}
                        data={this.props.GRAPH_C_PARA_001}
                    />
                    <VictoryLabel text="Time (in minutes)" x={width * 0.45} y={yAxisForTimeLabel} textAnchor="middle"/>
                </VictoryChart>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    GRAPH_C_PARA_001: state.GRAPH_C_PARA_001,
});


export default connect(mapStateToProps, null)(CurrentProductionRateGraph)
