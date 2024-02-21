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
import Assuntos from './Assuntos/Assuntos/Assuntos';
import WatchScreen from './Assuntos/WatchScreen/WatchScreen';
import QuestionaryScreen from './Questionary/QuestionaryScreen';
import FirstTest from './FirstTest/FirstTest';
import FirstTestResult from './FirstTestResult/FirstTestResult';
import {useAuth} from '../../context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StartStack = createNativeStackNavigator();

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

const AssuntosStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AssuntosStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Assuntos" component={withTheme(Assuntos)} />
      <Stack.Screen name="WatchScreen" component={withTheme(WatchScreen)} />
    </Stack.Navigator>
  );
};

const TestStack = () => {
  const {userData} = useAuth();

  return (
    <StartStack.Navigator
      initialRouteName={userData?.first_access ? 'Onboarding' : 'StartTest'}
      screenOptions={{headerShown: false}}>
      <StartStack.Screen name="StartTest" component={withTheme(StartTest)} />
      <StartStack.Screen name="FirstTest" component={withTheme(FirstTest)} />
      <Stack.Screen
        name="FirstTestResult"
        component={withTheme(FirstTestResult)}
      />
      <StartStack.Screen name="Onboarding" component={withTheme(Onboarding)} />
    </StartStack.Navigator>
  );
};

const AppStackScreens = () => {
  const {userData} = useAuth();

  if (userData?.first_access) {
    return <TestStack />;
  }

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="AssuntosStack" component={AssuntosStack} />
      <Tab.Screen name="ForumStack" component={ForumStack} />
      <Tab.Screen name="TestStack" component={TestStack} />
    </Tab.Navigator>
  );
};

export default AppStackScreens;
