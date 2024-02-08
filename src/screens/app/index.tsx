import React from 'react';

import HomeScreen from './Home/HomeScreen';
import {AppStackParamsList} from '../types';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './Settings/Settings';
import CustomTabBar from '../../components/BottomBar/BottomBar';
const Tab = createBottomTabNavigator<AppStackParamsList>();

// const screens: StackScreen<AppStackParamsList>[] = [
//   {name: 'Home', component: HomeScreen},
// ];

const AppStackScreens = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default AppStackScreens;
