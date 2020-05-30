import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import Icon from "react-native-vector-icons/FontAwesome";
import ProjectionScreen from './ProjectionScreen';
import MaterialBalancePlantScreen from './MaterialBalancePlantScreen';
import MaterialBalanceEQPScreen from './MaterialBalanceEQPScreen';
import SettingsScreen from './SettingsScreen';
import SideDrawer from "../components/SideDrawer";
import SideBar from "../components/SideBar";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator,} from '@react-navigation/material-bottom-tabs';
import LoadingScreen from "./LoadingScreen";
import HeaderComponent from "../components/HeaderComponent";

const HomeScreenStack = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            headerTitle: () => <HeaderComponent title={"Home 123"}/>,
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
            // headerLeft: () =>
            //     <SideBar navigation={navigation}/>
        })
    },
});

const ProjectionScreenStack = createStackNavigator({
    ProjectionScreen: {
        screen: ProjectionScreen,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Projections",
            tabBarIcon: ({tintColor}) => (
                <Icon name="search" size={25} color={tintColor}/>
            ),
            // headerLeft: () =>
            //     <SideBar navigation={navigation}/>
        })
    },
});

const MaterialBalancePlantScreenStack = createStackNavigator({
    MaterialBalancePlantScreen: {
        screen: MaterialBalancePlantScreen,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Material Balance- Plant",
            tabBarIcon: ({tintColor}) => (
                <Icon name="industry" size={25} color={tintColor}/>
            ),
            // headerLeft: () =>
            //     <SideBar navigation={navigation}/>
        })
    },
});

const MaterialBalanceEQPScreenStack = createStackNavigator({
    MaterialBalanceEQPScreen: {
        screen: MaterialBalanceEQPScreen,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Material Balance- EQP",
            tabBarIcon: ({tintColor}) => (
                <Icon name="product-hunt" size={25} color={tintColor}/>
            ),
            // headerLeft: () =>
            //     <SideBar navigation={navigation}/>
        })
    },
});

const SettingsScreenStack = createStackNavigator({
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Settings",
            tabBarIcon: ({tintColor}) => (
                <Icon name="gear" size={25} color={tintColor}/>
            ),
            // headerLeft: () =>
            //     <SideBar navigation={navigation}/>
        })
    },
});


const MenuDrawer = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreenStack,
            navigationOptions:  {
                headerTitle: "Home",
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="home" size={25} color={tintColor}/>
                    )
                }
        },
        Projections: {
            screen: ProjectionScreenStack,
            navigationOptions: {
                headerTitle: "Projections",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="search" size={25} color={tintColor}/>
                )
            }
        },
        MB_Plant: {
            screen: MaterialBalancePlantScreenStack,
            navigationOptions: {
                headerTitle: "Material Balance Plant Screen",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="industry" size={25} color={tintColor}/>
                )
            }
        },
        MB_EQP: {
            screen: MaterialBalanceEQPScreenStack,
            navigationOptions: {
                headerTitle: "Material Balance EQP Screen",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="product-hunt" size={25} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: SettingsScreenStack,
            navigationOptions: {
                headerTitle: "Settings",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="gear" size={25} color={tintColor}/>
                )
            }
        },
        Loading: {
            screen: LoadingScreen,
        },
    },
    {
        initialRouteName: 'Loading',
        tabBarOptions: {
            activeTintColor: '#eb6e3d'
        }
    }
);


export default MenuDrawer;
