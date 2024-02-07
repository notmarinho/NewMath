import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home/HomeScreen';
import {AppStackParamsList, StackScreen} from '../types';
import {BottomBar} from '../../components';
import {NavigationContainer} from '@react-navigation/native';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const screens: StackScreen<AppStackParamsList>[] = [
  {name: 'Home', component: HomeScreen},
];

const AppStackScreens = () => {
  return <BottomBar />;
};

export default AppStackScreens;
