import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome'
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SideDrawer from "../components/SideDrawer";

const HomeScreenStack = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: "Home Page",
            headerLeft: () =>
                <View>
                    <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                        <Icon name='bars' size={25} />
                    </TouchableOpacity>
                </View>
        })
    },
});

const MenuDrawer = createDrawerNavigator(
    {
        HomeScreen: { screen: HomeScreenStack },
        ProfileScreen: { screen: LoginScreen },
    }, {
        contentComponent: props => <SideDrawer {...props} />
    }
  );

export default MenuDrawer;