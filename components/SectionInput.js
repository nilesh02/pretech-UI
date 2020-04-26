import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput } from 'react-native';
import { theme } from '../core/theme';
import { updateBdata_001, updateBdata_002, updateBdata_003, updateBdata_004 } from '../actions/actions'
import { connect } from 'react-redux';
import { VARIABLES } from '../utils/utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SectionInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      value: this.props.value,
      unit: this.props.unit,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.state.label}</Text>
        <View style={styles.innerContainer}>
          <TextInput style={styles.value} keyboardType={'numeric'} value={String(this.state.value)} onChangeText={(text) => this.props.onChangeHandler(text,this.props.isRise)} />
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