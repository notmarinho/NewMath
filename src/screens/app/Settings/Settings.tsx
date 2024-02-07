import {Button, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Settings = () => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

export default Settings;
