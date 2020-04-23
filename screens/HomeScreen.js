import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as d3 from 'd3';
import DisplayLineChart from '../components/DisplayLineChart';
import SectionText from '../components/SectionText';
import {getData} from '../actions/actions'
import {connect} from 'react-redux';

class HomeScreen extends Component {

    componentDidMount() {
        firebase.storage().ref('data.csv').getDownloadURL().then(function (url) {
            d3.csv(url).then(function (result) {
                this.props.getAllData(result);
                console.log(result);
            }.bind(this))
        }.bind(this));
    }



    render() {

        let graphData = [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                color: (opacity = 1) => 'red',
            },
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                color: (opacity = 1) => '#000000',
            },

        ]
        return (
            <ScrollView>
                <ScrollView horizontal={true}>
                    <DisplayLineChart graphLabel={['Jan', 'Feb', 'Mar']} graphData={graphData}/>
                    <DisplayLineChart graphLabel={['Jan', 'Feb', 'Mar']} graphData={graphData}/>
                </ScrollView>
                <View style={styles.container}>
                    <SectionText label="Batch Number" value='Data-001' unit=""/>
                    <SectionText label="Product" value="Data-002" unit=""/>
                    <SectionText label="Officer In-charge" value="Data-011" unit=""/>
                </View>
                <View style={styles.container}>
                    <SectionText label="Product Recovered" value={this.props.currentRow['Para-010']} unit="KG"/>
                    <SectionText label="RM Consumed" value={this.props.currentRow['Para-001']} unit="KG"/>
                    <SectionText label="Energy Consumed" value={this.props.currentRow['Para-009']} unit="KWH"/>
                </View>

                <View style={styles.container}>
                    <SectionText label="Est. Time to Finish" value="Cpara-005" unit="days/hrs/min"/>
                    <SectionText label="Est. Cost of Batch" value="Rs." unit="Cpara-002"/>
                </View>

                <View style={styles.container}>
                    <SectionText label="Current Production Rate" value="Cpara-001" unit="KG/hr"/>
                    <SectionText label="Est. Amt. of Production" value="PAlt-002" unit="kG"/>
                    <SectionText label="Target Production" value="CPara-003" unit="kG"/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
})

const mapStateToProps = state => ({
    currentRow: state.currentRow,
});

const mapDispatchToProps = dispatch => ({
    getAllData: data => {
        dispatch(getData(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)