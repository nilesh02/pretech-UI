import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


const SideBar = ({navigation,...props}) => (
    <View style={{marginLeft:20}}>
    <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
        <Icon name='bars' size={25} />
    </TouchableOpacity>
    </View>
);
export default SideBar;