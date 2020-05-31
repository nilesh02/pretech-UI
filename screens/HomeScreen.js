import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import SectionText from '../components/SectionText';
import TopSection from '../components/TopSection';
import {connect} from 'react-redux';
import {DAYS_HOURS_MINS_STRING, getDaysHrsMins, VARIABLES} from "../utils/utils";
import {theme} from "../core/theme";
import HomeScreenGraphMenu from "./HomeScreenGraphMenu";

const width = Dimensions.get('window').width

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleHorizontal: true,
            animating: true,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({animating: false});
        }, 50);
    }

    onChangeSwitch(switchValue) {
        this.setState({toggleHorizontal: !switchValue})
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

                    <View style={styles.HomeScreenGraphMenuStyle}>
                        <HomeScreenGraphMenu/>
                    </View>

                    <View style={styles.container}>
                        <SectionText label="Product Recovered" value={this.props.currentRow[VARIABLES.PARA_010]}
                                     unit="KG"/>
                        <SectionText label="RM Consumed" value={this.props.currentRow[VARIABLES.PARA_001]} unit="KG"/>
                        <SectionText label="Energy Consumed" value={this.props.currentRow[VARIABLES.PARA_009]}
                                     unit="KWH"/>
                    </View>

                    <View style={styles.container}>
                        <SectionText label="Est. Time to Finish" value={getDaysHrsMins(this.props.C_PARA.C_PARA_005)}
                                     unit={DAYS_HOURS_MINS_STRING}/>
                        <SectionText label="Est. Cost of Batch" value={this.props.C_PARA.C_PARA_002} unit="Rs"/>
                    </View>

                    <View style={styles.container}>
                        <SectionText label="Current Production Rate" value={this.props.C_PARA.C_PARA_001} unit="KG/hr"/>
                        <SectionText label="Est. Amt. of Production" value={this.props.P_ALT.P_ALT_002} unit="kG"/>
                        <SectionText label="Target Production" value={this.props.C_PARA.C_PARA_003} unit="kG"/>
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
        elevation:5,
        alignSelf:'center',
        width:'95%',
        borderRadius:7,
        overflow: 'hidden'
    },
    HomeScreenGraphMenuStyle: {
        width:'95%',
        justifyContent:'center',
        alignSelf:'center',
        elevation:10,
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
    productRecovered: state.productRecovered,
    rmConsumed: state.rmConsumed,
    energyConsumed: state.energyConsumed,
    graphLabel: state.graphLabel,
    C_PARA: state.C_PARA,
    P_ALT: state.P_ALT,
    normalizedRMConsumed: state.normalizedRMConsumed,
    normalizedProductRecovered: state.normalizedProductRecovered,
    normalizedEnergyConsumed: state.normalizedEnergyConsumed
});


export default connect(mapStateToProps, null)(HomeScreen)
