import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home/HomeScreen';
import {AppStackParamsList, StackScreen} from '../types';
import {CustomNavigationBar} from '../../components';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const screens: StackScreen<AppStackParamsList>[] = [
  {name: 'Home', component: HomeScreen},
];

const AppStackScreens = () => {
  return (
    <AppStack.Navigator initialRouteName="Home">
      {screens.map(screen => (
        <AppStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            header: CustomNavigationBar,
          }}
        />
      ))}
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
