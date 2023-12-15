import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackScreens from './app';
import AuthStackScreen from './auth';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(nextUser: FirebaseAuthTypes.User | null) {
    setUser(nextUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

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
