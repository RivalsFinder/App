import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Main from './src/screens/Main';
import Notice from './src/screens/Notice';
import Filter from "./src/screens/Filter";
import Creator from './src/screens/Create';

const RootStack = createStackNavigator({
    GameScreen: {
        screen: Main,
        navigationOptions: () => ({
            header: null
        })
    },
    NoticeScreen: {
        screen: Notice
    },
    FilterScreen: {
        screen: Filter,
        navigationOptions: () => ({
            header: null
        })
    },
    CreatorScreen: {
        screen: Creator,
        navigationOptions: () => ({
            header: null
        })
    }
});
export default createAppContainer(RootStack);