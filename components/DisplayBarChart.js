import React, { Component } from 'react';
import { View,Dimensions} from 'react-native';
import {
    BarChart
} from "react-native-chart-kit";

export default class DisplayBarChart extends Component {
    render() {
        return (
            <View>
                <BarChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width*0.95} // from react-native
                    height={300}
                    yAxisLabel="$"
                    yAxisSuffix="k"
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
            </View>
        );
    }
}