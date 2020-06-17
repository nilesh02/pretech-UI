import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {theme} from "../core/theme";
import HomeScreenCombinedGraph from "./graphScreens/HomeScreenCombinedGraph";
import ProductRecoveredGraphScreen from "./graphScreens/ProductRecoveredGraphScreen";
import RMConsumedGraphScreen from "./graphScreens/RMConsumedGraphScreen";
import EnergyConsumedGraphScreen from "./graphScreens/EnergyConsumedGraphScreen";
import {createAppContainer} from 'react-navigation';

const HomeScreenGraphContainer = createMaterialTopTabNavigator(
    {
        Combined: {
            screen: HomeScreenCombinedGraph,
            navigationOptions:  {
                tabBarLabel: 'Combined',
                // tabBarIcon: ({tintColor}) => (
                //     <FontAwesomeIcon name="home" size={25} color={tintColor}/>
                // )
            }
        },
        ProductRecovered: {
            screen: ProductRecoveredGraphScreen,
            navigationOptions:  {
                tabBarLabel: 'Product Recovered',
                // tabBarIcon: ({tintColor}) => (
                //     <FontAwesomeIcon name="line-chart" size={25} color={tintColor}/>
                // )
            }
        },
        RM_Consumed: {
            screen: RMConsumedGraphScreen,
            navigationOptions:  {
                tabBarLabel: 'RM    Consumed',
                // tabBarIcon: ({tintColor}) => (
                //     <MaterialCommunityIcons name="washing-machine" size={25} color={tintColor}/>
                // )
            }
        },
        Energy_Consumed: {
            screen: EnergyConsumedGraphScreen,
            navigationOptions:  {
                tabBarLabel: 'Energy Consumed',
                // tabBarIcon: ({tintColor}) => (
                //     <Octicons name="tools" size={25} color={tintColor}/>
                // )
            }
        },
    },
    {
        initialRouteName:"Combined",
        tabBarOptions:{
            activeTintColor: theme.colors.primary,
            inactiveTintColor:theme.colors.bottomInactiveTab,
            indicatorStyle:{
                backgroundColor: theme.colors.primary,
            },
            labelStyle: {
                fontSize: 10,
                fontFamily:'bold',
                margin: 0,
                padding: 0,
            },
            style:{
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                marginTop: 20,
                borderTopLeftRadius: 7,
                borderTopRightRadius: 7,
            }
        }
    }
);

const HomeScreenGraphMenu = createAppContainer(HomeScreenGraphContainer)

export default HomeScreenGraphMenu;
