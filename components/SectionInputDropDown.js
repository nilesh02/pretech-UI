import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SectionInputDropDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      value: this.props.value,
      unit: this.props.unit,
      dropDown: 'Rise',
    };
  }

  render() {
    let data = [{
      value: 'Rise',
    }, {
      value: 'Fall',
    }];
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.state.label}</Text>
        <View style={styles.innerContainer}>
          <TextInput style={styles.value} keyboardType={'numeric'} value={String(this.state.value)} onChangeText={(text) => {
              this.setState({value:text});
              this.props.onChangeHandler(text,this.state.dropDown)
            }} />
          <Text style={styles.unit}>{this.state.unit}</Text>
          <Dropdown
            data={data}
            value={this.state.dropDown}
            containerStyle={{width:'60%'}}
            dropdownOffset={{top:10,left:0}}
            onChangeText={(text) =>{
              this.setState({dropDown:text});
              this.props.onChangeHandler(this.state.value,text)
            }}
          />
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