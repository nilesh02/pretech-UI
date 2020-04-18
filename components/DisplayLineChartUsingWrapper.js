import React, { Component } from 'react';
import { View,Dimensions} from 'react-native';
import {LineChart} from "react-native-charts-wrapper";

export default class DisplayLineChart extends Component {
    render() {
        return (
            <View>
                <LineChart
                    data={{
                        datasets: [
                            {
                                labels: ["January", "February", "March", "April", "May", "June"],
                                values: [
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
                />
            </View>
        );
    }
}