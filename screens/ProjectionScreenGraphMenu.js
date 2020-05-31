import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {theme} from "../core/theme";
import ProjectionScreenCombinedGraph from "./graphScreens/ProjectionScreenCombinedGraph";
import CurrentProductionRateGraph from "./graphScreens/CurrentProductionRateGraph";
import EstTimeToFinishGrpah from "./graphScreens/EstTimeToFinishGrpah";
import EstAmtOfProductionGraph from "./graphScreens/EstAmtOfProductionGraph";
import {createAppContainer} from 'react-navigation';

const ProjectionScreenGraphContainer = createMaterialTopTabNavigator(
    {
        Combined: {
            screen: ProjectionScreenCombinedGraph,
            navigationOptions:  {
                tabBarLabel: 'Combined',
                // tabBarIcon: ({tintColor}) => (
                //     <FontAwesomeIcon name="home" size={25} color={tintColor}/>
                // )
            }
        },
        CurrentProductionRate: {
            screen: CurrentProductionRateGraph,
            navigationOptions:  {
                tabBarLabel: 'Production Rate',
                // tabBarIcon: ({tintColor}) => (
                //     <FontAwesomeIcon name="line-chart" size={25} color={tintColor}/>
                // )
            }
        },
        EstTimeToFinish: {
            screen: EstTimeToFinishGrpah,
            navigationOptions:  {
                tabBarLabel: 'Est. Time to Finish',
                // tabBarIcon: ({tintColor}) => (
                //     <MaterialCommunityIcons name="washing-machine" size={25} color={tintColor}/>
                // )
            }
        },
        EstAmtOfProduction: {
            screen: EstAmtOfProductionGraph,
            navigationOptions:  {
                tabBarLabel: 'Est. Amt. of Production',
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
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }
        }
    }
);

const ProjectionScreenGraphMenu = createAppContainer(ProjectionScreenGraphContainer)

export default ProjectionScreenGraphMenu;
