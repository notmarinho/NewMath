import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

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
  StartTest: undefined;
  Settings: undefined;
};

export type AppScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;

export type StackScreen<S = unknown> = {
  name: keyof S;
  component: any;
  options?: NativeStackNavigationOptions;
};
