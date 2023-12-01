import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignIn/SignInScreen';
import {AuthStackParamsList} from '../types';

const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
