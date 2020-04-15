import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './HomeScreen';
import ProjectionScreen from './ProjectionScreen';
import MaterialBalancePlantScreen from './MaterialBalancePlantScreen';
import MaterialBalanceEQPScreen from './MaterialBalanceEQPScreen';
import SettingsScreen from './SettingsScreen';
import SideDrawer from "../components/SideDrawer";
import SideBar from "../components/SideBar";

const HomeScreenStack = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: "Home Page",
            headerLeft: () =>
                <SideBar navigation={navigation}/>
        })
    },
});

const ProjectionScreenStack = createStackNavigator({
    ProjectionScreen: {
        screen: ProjectionScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: "Projections",
            headerLeft: () =>
                <SideBar navigation={navigation}/>
        })
    },
});

const MaterialBalancePlantScreenStack = createStackNavigator({
    MaterialBalancePlantScreen: {
        screen: MaterialBalancePlantScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: "Material Balance- Plant",
            headerLeft: () =>
                <SideBar navigation={navigation}/>
        })
    },
});

const MaterialBalanceEQPScreenStack = createStackNavigator({
    MaterialBalanceEQPScreen: {
        screen: MaterialBalanceEQPScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: "Material Balance- EQP",
            headerLeft: () =>
                <SideBar navigation={navigation}/>
        })
    },
});

const SettingsScreenStack = createStackNavigator({
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: "Settings",
            headerLeft: () =>
                <SideBar navigation={navigation}/>
        })
    },
});

const MenuDrawer = createDrawerNavigator(
    {
        HomeScreen: { screen: HomeScreenStack },
        ProjectionScreen: { screen: ProjectionScreenStack },
        MaterialBalancePlantScreen:{screen:MaterialBalancePlantScreenStack},
        MaterialBalanceEQPScreen:{screen:MaterialBalanceEQPScreenStack},
        SettingsScreen:{screen:SettingsScreenStack},
    }, {
        contentComponent: props => <SideDrawer {...props} />
    }
  );

export default MenuDrawer;