import React, { Component } from 'react';
import { View,Dimensions,Text} from 'react-native';
import {
    BarChart
} from "react-native-chart-kit";

export default class DisplayBarChart extends Component {
    render() {
        return (
            <View>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 20,
                }}> {this.props.graphName}</Text>
                <BarChart
                    data={{
                        labels: this.props.graphLabel,
                        datasets: this.props.graphData
                    }}
                    width={Dimensions.get("window").width*0.95} // from react-native
                    height={180}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        // decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => '#000000',
                        labelColor: (opacity = 1) => '#000000',
                        fillShadowGradient:'#000000',
                        fillShadowGradientOpacity:1,  
                    }}
                    withInnerLines={false}
                    bezier
                    style={{
                        marginLeft:10,
                        marginVertical: 8,
                        borderRadius:0
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