import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home/HomeScreen';
import {AppStackParamsList, StackScreen} from '../types';
// import {CustomNavigationBar} from '../../components';
import Onboarding from './Onboarding/Onboarding';
import StartTest from './Onboarding/StartTest';
import Settings from './Settings/Settings';
import QuestionaryScreen from './Questionary/QuestionaryScreen';
import {withTheme} from 'react-native-paper';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const screens: StackScreen<AppStackParamsList>[] = [
  {name: 'Home', component: HomeScreen},
  {name: 'Onboarding', component: Onboarding},
  {name: 'StartTest', component: StartTest},
  {name: 'Settings', component: Settings},
  {name: 'Questionary', component: QuestionaryScreen},
];

const AppStackScreens = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{headerShown: false}}>
      {screens.map(screen => (
        <AppStack.Screen
          key={screen.name}
          name={screen.name}
          component={withTheme(screen.component)}
        />
      ))}
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
