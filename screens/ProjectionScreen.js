import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, View,Text,ActivityIndicator} from 'react-native';
import SectionText from '../components/SectionText';
import SectionInputDropDown from '../components/SectionInputDropDown';
import TopSection from '../components/TopSection';
import {DAYS_HOURS_MINS_STRING, getDaysHrsMins, VARIABLES} from "../utils/utils";
import {connect} from "react-redux";
import ProjectionScreenGraphMenu from "./ProjectionScreenGraphMenu";
import {theme} from "../core/theme";
import SectionHeading from '../components/SectionHeading';


const width = Dimensions.get('window').width
const EXPECTED_RISE_OR_FALL_RATE1 = "Expected Rise" + " or " + "\n" + "Fall in Rate-1";
const EXPECTED_RISE_OR_FALL_RATE2 = "Expected Rise" + " or " + "\n" + "Fall in Rate-2";

class ProjectionScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleHorizontal: true,
            B_DATA_005:0,
            B_DATA_006:0,
            C_PARA_006:this.props.P_ALT.P_ALT_001,
            C_PARA_007:this.props.P_ALT.P_ALT_001,
            animating:true,
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({animating:false});
        },50);
    }

    onChangeSwitch(switchValue) {
        this.setState({toggleHorizontal: !switchValue})
    }

    onChangeB_Data_005(value,dropDownValue) {
        // console.log(value,dropDownValue);
        if(dropDownValue==='Rise'){
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/value)/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 + (value / 100))
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 })
            }
        } else {
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/(value*-1))/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 - (value / 100))
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_005: value, C_PARA_006: this.props.P_ALT.P_ALT_001 })
            }
        }
    }

    onChangeB_Data_006(value,dropDownValue) {
        if(dropDownValue==='Rise'){
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/value)/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 + (value / 100))
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 })
            }
        } else {
            if (value > 0) {
                let temp=((this.props.C_PARA.C_PARA_004/(value*-1))/100)
                // let temp = this.props.C_PARA.C_PARA_004 * (1 - (value / 100))
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 > temp ? this.props.P_ALT.P_ALT_001 : temp })
            } else{
                this.setState({B_DATA_006: value, C_PARA_007: this.props.P_ALT.P_ALT_001 })
            }
        }
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
                        <ScrollView style={{backgroundColor: theme.colors.backgroundColor}}>
                            <TopSection batchNumber={this.props.benchmarkRow[VARIABLES.DATA_001]}
                                ProductName={this.props.benchmarkRow[VARIABLES.DATA_002]}
                                OfficeInCharge={this.props.benchmarkRow[VARIABLES.DATA_011]}>
                            </TopSection>
                            <View style={styles.ProjectionScreenGraphMenuStyle}>
                                <ProjectionScreenGraphMenu/>
                            </View>
                            <View style={styles.container}>
                                <SectionText label="Current Production Rate" value={this.props.C_PARA.C_PARA_001} unit="KG/hr"/>
                                <SectionText label="Est. Amt. of Production" value={this.props.P_ALT.P_ALT_002} unit="KG"/>
                            </View>

                            <View style={styles.container}>
                                <SectionHeading heading="Estimated Time to Finish"/>
                                <SectionText label="Est. Time In Days" value={getDaysHrsMins(this.props.P_ALT.P_ALT_001,'Days')}
                                            unit="Days"/>
                                <SectionText label="Est. Time In Hours" value={getDaysHrsMins(this.props.P_ALT.P_ALT_001,'Hours')}
                                            unit="Hours"/>
                                <SectionText label="Est. Time In Mins" value={getDaysHrsMins(this.props.P_ALT.P_ALT_001,'Mins')}
                                            unit="Mins"/>
                            </View>

                            <View style={styles.container}>
                                <SectionHeading heading="Projected Time to Finish"/>
                                <SectionInputDropDown label={EXPECTED_RISE_OR_FALL_RATE1} value={this.state.B_DATA_005} unit="%" onChangeHandler={this.onChangeB_Data_005.bind(this)}/>
                                {/* <SectionText label="Proj. Time to Finish" value={getDaysHrsMins(this.state.C_PARA_006)} unit={DAYS_HOURS_MINS_STRING}/> */}
                                <SectionText label="Proj. Time In Days" value={getDaysHrsMins(this.state.C_PARA_006,'Days')}
                                            unit="Days"/>
                                <SectionText label="Proj. Time In Hours" value={getDaysHrsMins(this.state.C_PARA_006,'Hours')}
                                            unit="Hours"/>
                                <SectionText label="Proj. Time In Mins" value={getDaysHrsMins(this.state.C_PARA_006,'Mins')}
                                            unit="Mins"/>
                            </View>

                            <View style={styles.container}>
                                <SectionHeading heading="Projected Time to Finish"/>
                                <SectionInputDropDown label={EXPECTED_RISE_OR_FALL_RATE2} value={this.state.B_DATA_006} unit="%" onChangeHandler={this.onChangeB_Data_006.bind(this)}/>
                                {/* <SectionText label="Proj. Time to Finish" value={getDaysHrsMins(this.state.C_PARA_006)} unit={DAYS_HOURS_MINS_STRING}/> */}
                                <SectionText label="Proj. Time In Days" value={getDaysHrsMins(this.state.C_PARA_007,'Days')}
                                            unit="Days"/>
                                <SectionText label="Proj. Time In Hours" value={getDaysHrsMins(this.state.C_PARA_007,'Hours')}
                                            unit="Hours"/>
                                <SectionText label="Proj. Time In Mins" value={getDaysHrsMins(this.state.C_PARA_007,'Mins')}
                                            unit="Mins"/>
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
    containerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProjectionScreenGraphMenuStyle:{
        width:'95%',
        justifyContent:'center',
        alignSelf:'center',
    }
})

const mapStateToProps = state => ({
    currentRow: state.currentRow,
    benchmarkRow: state.benchmarkRow,
    C_PARA: state.C_PARA,
    P_ALT: state.P_ALT,
    graphLabel: state.graphLabel,
    GRAPH_P_ALT_001: state.GRAPH_P_ALT_001,
    GRAPH_P_ALT_002: state.GRAPH_P_ALT_002,
    GRAPH_C_PARA_001: state.GRAPH_C_PARA_001,
    normalizedGRAPH_P_ALT_001: state.normalizedGRAPH_P_ALT_001,
    normalizedGRAPH_P_ALT_002: state.normalizedGRAPH_P_ALT_002,
    normalizedGRAPH_C_PARA_001: state.normalizedGRAPH_C_PARA_001,
});

export default connect(mapStateToProps)(ProjectionScreen)
