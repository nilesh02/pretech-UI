import React, {Component} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from "react-native-chart-kit";

let pieData1 = [
    {
        name: ': East',
        population: '100',
        color: '#00664f',
        legendFontColor: 'black',
        legendFontSize: 12,
    },
]

export default class DisplayLineChart extends Component {

    render() {
        return (
            <View>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 20,
                }}> {this.props.graphName}</Text>
                <LineChart
                    data={{
                        labels: this.props.graphLabel,
                        datasets: this.props.graphData
                    }}
                    width={Dimensions.get("window").width * 0.95} // from react-native
                    height={180}
                    yAxisLabel=""
                    xAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: this.props.decimalPlaces ? this.props.decimalPlaces : 1, // optional, defaults to 2dp
                        color: (opacity = 1) => this.props.color,
                        labelColor: (opacity = 1) => '#000000',
                        fillShadowGradient: '#ffffff',
                        fillShadowGradientOpacity: 0,
                    }}
                    withInnerLines={false}
                    bezier
                    style={{
                        marginLeft: 10,
                        marginVertical: 8,
                        borderRadius: 0
                    }}
                />
                <Text style={{
                    alignSelf: 'center',
                    marginBottom: 12,
                }}> {this.props.xAxisLabel}</Text>

            </View>
        );
    }
}