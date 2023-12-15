import {DarkColors, DefaultColors} from './colors';
import {MD3LightTheme, MD3Theme} from 'react-native-paper';

const DefaultTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...DefaultColors.colors,
  },
};

const DarkTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...DarkColors.colors,
  },
};

export default {
  dark: DarkTheme,
  default: DefaultTheme,
};
