import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import HomeScreen from './HomeScreen';
import ProjectionScreen from './ProjectionScreen';
import MaterialBalancePlantScreen from './MaterialBalancePlantScreen';
import MaterialBalanceEQPScreen from './MaterialBalanceEQPScreen';
import SettingsScreen from './SettingsScreen';
import {theme} from '../core/theme';


const BottomMenu = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesomeIcon name="home" size={25} color={tintColor}/>
                )
            }
        },
        Projections: {
            screen: ProjectionScreen,
            navigationOptions: {
                tabBarLabel: 'Projections',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesomeIcon name="line-chart" size={25} color={tintColor}/>
                )
            }
        },
        MB_Plant: {
            screen: MaterialBalancePlantScreen,
            navigationOptions: {
                tabBarLabel: 'MB_Plant',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons name="washing-machine" size={25} color={tintColor}/>
                )
            }
        },
        MB_EQP: {
            screen: MaterialBalanceEQPScreen,
            navigationOptions: {
                tabBarLabel: 'MB_EQP',
                tabBarIcon: ({tintColor}) => (
                    <Octicons name="tools" size={25} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({tintColor}) => (
                    <FontAwesomeIcon name="cog" size={25} color={tintColor}/>
                )
            }
        },
    },
    {
        initialRouteName: "Home",
        tabBarOptions: {
            activeTintColor: theme.colors.primary,
            inactiveTintColor: theme.colors.bottomInactiveTab,
            labelStyle: {
                fontSize: 10,
                fontFamily: 'bold',
                margin: 0,
                padding: 0,
            },
        }
    }
);

export default BottomMenu;
