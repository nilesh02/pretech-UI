import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput } from 'react-native';
import { theme } from '../core/theme';
import { updateBdata_001, updateBdata_002, updateBdata_003, updateBdata_004 } from '../actions/actions'
import { connect } from 'react-redux';
import { VARIABLES } from '../utils/utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SectionInputAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      value: this.props.value,
      unit: this.props.unit,
      Bdata: this.props.Bdata
    };
  }

  handleChange(text){
    this.setState({ value: text });
    switch (this.state.Bdata){
      case VARIABLES.BDATA_001: this.props.updateBdata_001(text); break;
      case VARIABLES.BDATA_002: this.props.updateBdata_002(text); break;
      case VARIABLES.BDATA_003: this.props.updateBdata_003(text); break;
      case VARIABLES.BDATA_004: this.props.updateBdata_004(text); break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.state.label}</Text>
        <View style={styles.innerContainer}>
          <TextInput style={styles.value} keyboardType={'numeric'} value={String(this.state.value)} onChangeText={(text) => this.handleChange(text)} />
          <Text style={styles.unit}>{this.state.unit}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    marginVertical: 2,
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  innerContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#000',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: "900",
    color: theme.colors.label,
  },
  value: {
    fontWeight: "500",
    fontSize: 15,
    color: theme.colors.value,
    alignItems: 'center',
    borderBottomColor: theme.colors.value,
    borderBottomWidth: 1,
  },
  unit: {
    fontWeight: "500",
    fontSize: 13,
    color: theme.colors.unit,
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  updateBdata_001: data => {
    dispatch(updateBdata_001(data));
  },
  updateBdata_002: data => {
    dispatch(updateBdata_002(data));
  },
  updateBdata_003: data => {
    dispatch(updateBdata_003(data));
  },
  updateBdata_004: data => {
    dispatch(updateBdata_004(data));
  },
});

export default connect(null, mapDispatchToProps)(SectionInputAdmin)