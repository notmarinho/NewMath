import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackScreens from './app';
import AuthStackScreen from './auth';

const Navigation = () => {
  const [user] = useState(null);

  return (
    <NavigationContainer>
      {user ? <AppStackScreens /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
