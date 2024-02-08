import React from 'react';

import {AppStackParamsList, StackScreen} from '../types';
// import {CustomNavigationBar} from '../../components';

import HomeScreen from './Home/HomeScreen';
import Onboarding from './Onboarding/Onboarding';
import StartTest from './Onboarding/StartTest';
import Settings from './Settings/Settings';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomTabBar from '../../components/BottomBar/BottomBar';
const Tab = createBottomTabNavigator<AppStackParamsList>();

const screens: StackScreen<AppStackParamsList>[] = [
  {name: 'Home', component: HomeScreen},
  {name: 'Onboarding', component: Onboarding},
  {name: 'StartTest', component: StartTest},
  {name: 'Settings', component: Settings},
];

const AppStackScreens = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Onboarding"
      screenOptions={{headerShown: false}}>
      {screens.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AppStackScreens;
