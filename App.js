import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import Main from './src/screens/Main';
import Auth from './src/screens/Auth';
import Notice from './src/screens/Notice';
import Creator from './src/screens/Create';

const main = Platform.select({
    ios: 'GameScreen',
    android: 'AuthScreen'
});

const RootStack = createStackNavigator({
    AuthScreen: {
        screen: Auth,
        navigationOptions: () => ({
            header: null
        })
    },
    GameScreen: {
        screen: Main,
        navigationOptions: () => ({
            header: null
        })
    },
    NoticeScreen: {
        screen: Notice,
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
}, {initialRouteName: main});
export default createAppContainer(RootStack);