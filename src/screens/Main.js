import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from "native-base";
import GamesScreen from './Games';
import NewsScreen from './News';

const TabNavigator = createBottomTabNavigator({
  Games: {
    screen: GamesScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name="stopwatch" color={tintColor}/>
      ),
    }
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (
        <Icon name="list" color={tintColor}/>
      ),
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: 'tomato',
    activeBackgroundColor: '#1a73e8a6',
    showLabel: false,
    inactiveTintColor: 'gray',
  },
});

export default TabNavigator;
