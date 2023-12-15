import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignIn/SignInScreen';
import SignUpScreen from './SignUp/SignUpScreen';
import {AuthStackParamsList, StackScreen} from '../types';
import {CustomNavigationBar} from '../../components';

const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

const screens: StackScreen<AuthStackParamsList>[] = [
  {name: 'SignIn', component: SignInScreen},
  {name: 'SignUp', component: SignUpScreen},
];

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      {screens.map(screen => (
        <AuthStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            header: CustomNavigationBar,
          }}
        />
      ))}
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
