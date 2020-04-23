import React, { Component } from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';
import * as firebase from 'firebase';
import SectionText from '../components/SectionText';
import SectionHeading from '../components/SectionHeading';
import {getData} from "../actions/actions";
import {connect} from "react-redux";
import {VARIABLES} from "../utils/utils";

class MaterialBalanceEQPScreen extends Component {
    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <SectionText label="Batch Number" value="Data-001" unit=""/>
                <SectionText label="Product" value="Data-002" unit=""/>
                <SectionText label="Officer In-charge" value="Data-011" unit=""/>
            </View>
            <View style={styles.container}>
                <SectionHeading heading="C-01" />
                <SectionText label="Feed - RM" value={this.props.currentRow['Para-001']} unit="KG"/>
                <SectionText label="Feed - Solvent" value={this.props.currentRow['Para-002']} unit="KG"/>
                <SectionText label="C-01 Top Product" value="Cpara-009" unit="kG"/>
                <SectionText label="C-01 Bottom Product" value="Cpara-010" unit="kG"/>
                <SectionText label="Matl. In Process" value="Cpara-011" unit="kG"/>
            </View>

            <View style={styles.container}>
                <SectionHeading heading="C=02" />
                <SectionText label="Feed" value={this.props.currentRow['Para-003']} unit="KG"/>
                <SectionText label="To Decantation" value={this.props.currentRow['Para-011']}unit="KG"/>
                <SectionText label="Effluent to ETP" value={this.props.currentRow['Para-012']} unit="kG"/>
                <SectionText label="Matl. In Process" value="Cpara-012" unit="kG"/>
            </View>

            <View style={styles.container}>
                <SectionHeading heading="Current Batch" />
                <SectionText label="Feed" value={this.props.currentRow['Para-004']} unit="KG"/>
                <SectionText label="To Decantation" value={this.props.currentRow[VARIABLES.PARA_009]} unit="kG"/>
                <SectionText label="Product Recovered" value={this.props.currentRow['Para-010']} unit="KG"/>
                <SectionText label="Matl. In Process" value="Cpara-013" unit="kG"/>
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
        marginVertical:10,
    }
})

const mapStateToProps = state => ({
    currentRow: state.currentRow,
});

const mapDispatchToProps = dispatch => ({
    getAllData: data => {
        dispatch(getData(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialBalanceEQPScreen)