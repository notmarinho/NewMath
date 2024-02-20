import React from 'react';
import {withTheme} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importações dos componentes das telas
import HomeScreen from './Home/HomeScreen';
import Onboarding from './Onboarding/Onboarding';
import StartTest from './Onboarding/StartTest';
import CustomTabBar from '../../components/BottomBar/BottomBar';
import Forum from './Forum/Forum';
import CreateForumTopic from './CreateForumTopic/CreateForumTopic';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ForumStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Forum"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Forum" component={withTheme(Forum)} />
      <Stack.Screen
        name="CreateForumTopic"
        component={withTheme(CreateForumTopic)}
      />
    </Stack.Navigator>
  );
};

const AppStackScreens = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={withTheme(HomeScreen)} />
      <Tab.Screen name="Onboarding" component={withTheme(Onboarding)} />
      <Tab.Screen name="ForumStack" component={ForumStack} />
      <Tab.Screen name="StartTest" component={withTheme(StartTest)} />
    </Tab.Navigator>
  );
};

export default AppStackScreens;
