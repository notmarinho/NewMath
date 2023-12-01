import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Non Authenticated
export type AuthStackParamsList = {
  SignIn: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamsList> =
  NativeStackScreenProps<AuthStackParamsList, T>;

// Authenticated
export type AppStackParamsList = {
  Home: undefined;
};

export type AppScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>;
