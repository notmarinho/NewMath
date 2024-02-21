import React from 'react';
import {withTheme} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importações dos componentes das telas
import HomeScreen from './Home/HomeScreen';
import Onboarding from './Onboarding/Onboarding';
import StartTest from './Onboarding/StartTest';
import CustomTabBar from '../../components/BottomBar/BottomBar';
import Forum from './Forum/Forum/Forum';
import CreateForumTopic from './Forum/CreateForumTopic/CreateForumTopic';
import Settings from './Settings/Settings';
import ForumTopicOpened from './Forum/ForumTopicOpened/ForumTopicOpened';
import QuestionaryScreen from './Questionary/QuestionaryScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={withTheme(HomeScreen)} />
      <Stack.Screen name="Settings" component={withTheme(Settings)} />
      <Stack.Screen
        name="Questionary"
        component={withTheme(QuestionaryScreen)}
      />
    </Stack.Navigator>
  );
};

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
      <Stack.Screen
        name="ForumTopicOpened"
        component={withTheme(ForumTopicOpened)}
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
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Onboarding" component={withTheme(Onboarding)} />
      <Tab.Screen name="ForumStack" component={ForumStack} />
      <Tab.Screen name="StartTest" component={withTheme(StartTest)} />
    </Tab.Navigator>
  );
};

export default AppStackScreens;
