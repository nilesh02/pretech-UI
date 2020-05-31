import React, {Component} from 'react';
import {ScrollView, StyleSheet, View,Text,ActivityIndicator} from 'react-native';
import SectionText from '../components/SectionText';
import SectionHeading from '../components/SectionHeading';
import TopSection from '../components/TopSection';
import {connect} from "react-redux";
import {VARIABLES} from "../utils/utils";

class MaterialBalanceEQPScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating:true,
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({animating:false});
        },50);
    }

    render() {

        if(this.state.animating){
            return (
                <View style={styles.containerLoader}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large"/>
                </View>

            );
        } else{

            return (
                <ScrollView>
                    <TopSection batchNumber={this.props.benchmarkRow[VARIABLES.DATA_001]} 
                                ProductName={this.props.benchmarkRow[VARIABLES.DATA_002]}
                                OfficeInCharge={this.props.benchmarkRow[VARIABLES.DATA_011]}>
                    </TopSection>
                    <View style={styles.container}>
                        <SectionHeading heading="C-01"/>
                        <SectionText label="Feed - RM" value={this.props.currentRow[VARIABLES.PARA_001]} unit="KG"/>
                        <SectionText label="Feed - Solvent" value={this.props.currentRow[VARIABLES.PARA_002]} unit="KG"/>
                        <SectionText label="C-01 Top Product" value={this.props.C_PARA.C_PARA_009} unit="kG"/>
                        <SectionText label="C-01 Bottom Product" value={this.props.C_PARA.C_PARA_010} unit="kG"/>
                        <SectionText label="Matl. In Process" value={this.props.C_PARA.C_PARA_011} unit="kG"/>
                    </View>

                    <View style={styles.container}>
                        <SectionHeading heading="C-02"/>
                        <SectionText label="Feed" value={this.props.currentRow[VARIABLES.PARA_003]} unit="KG"/>
                        <SectionText label="To Decantation" value={this.props.currentRow[VARIABLES.PARA_011]} unit="KG"/>
                        <SectionText label="Effluent to ETP" value={this.props.currentRow[VARIABLES.PARA_012]} unit="kG"/>
                        <SectionText label="Matl. In Process" value={this.props.C_PARA.C_PARA_012} unit="kG"/>
                    </View>

                    <View style={styles.container}>
                        <SectionHeading heading="Current Batch"/>
                        <SectionText label="Feed" value={this.props.currentRow[VARIABLES.PARA_004]} unit="KG"/>
                        <SectionText label="To Decantation" value={this.props.currentRow[VARIABLES.PARA_009]} unit="kG"/>
                        <SectionText label="Product Recovered" value={this.props.currentRow[VARIABLES.PARA_010]} unit="KG"/>
                        <SectionText label="Matl. In Process" value={this.props.C_PARA.C_PARA_013} unit="kG"/>
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
    }
})

const mapStateToProps = state => ({
    currentRow: state.currentRow,
    benchmarkRow: state.benchmarkRow,
    C_PARA: state.C_PARA,
    P_ALT: state.P_ALT,
});

export default connect(mapStateToProps)(MaterialBalanceEQPScreen)