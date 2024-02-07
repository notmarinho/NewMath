import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackScreens from './app';
import AuthStackScreen from './auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <RootStack.Screen
            name="App"
            component={AppStackScreens}
            options={{animation: 'slide_from_right'}}
          />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{animation: 'slide_from_left'}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
