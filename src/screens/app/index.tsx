import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home/HomeScreen';
import {AppStackParamsList} from '../types';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const AppStackScreens = () => {
  return (
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen name="Home" component={HomeScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
