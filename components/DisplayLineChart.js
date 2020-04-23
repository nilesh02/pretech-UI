import React, { Component } from 'react';
import { View,Dimensions} from 'react-native';
import {
    LineChart
} from "react-native-chart-kit";

let pieData1 = [
    {
      name: ': East',
      population:'100',
      color: '#00664f',
      legendFontColor: 'black',
      legendFontSize: 12,
    },
  ]
  
export default class DisplayLineChart extends Component {

    render() {
        return (
            <View>
                <LineChart
                    data={{
                        labels: this.props.graphLabel,
                        datasets: [
                            {
                                data: this.props.graphData,
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
                        color: (opacity = 1) => 'orange',
                        labelColor: (opacity = 1) => '#000000',
                        fillShadowGradient:'#ffffff',
                        fillShadowGradientOpacity:0,  
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