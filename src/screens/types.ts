import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MD3Theme} from 'react-native-paper';

// Non Authenticated
export type AuthStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamsList> =
  NativeStackScreenProps<AuthStackParamsList, T>;

// Authenticated
export type AppStackParamsList = {
  Home: undefined;
  Onboarding: undefined;
  ForumStackScreens: undefined;
  Forum: undefined;
  StartTest: undefined;
  Settings: undefined;
  Questionary: undefined;
};

export type AppScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T> & {theme: MD3Theme};

export type StackScreen<S = unknown> = {
  name: keyof S;
  component: any;
  options?: NativeStackNavigationOptions;
};
