import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from 'react-native-paper';
import {DefaultColors} from '../../theme/colors';

type Props = {
  type?: 'label' | 'title' | 'description' | 'largeTitle';
  color?: keyof typeof DefaultColors.colors;
} & RNTextProps;

const Text: FC<Props> = ({type = 'label', color = 'primary', ...props}) => {
  const theme = useTheme();

  const defaultStyle = StyleSheet.flatten([
    type === 'label' && styles.label,
    type === 'title' && styles.title,
    type === 'description' && styles.description,
    type === 'largeTitle' && styles.largeTitle,
    {color: theme.colors[color]},
    props.style,
  ]);

  return <RNText style={defaultStyle}>{props.children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  largeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
  },
  description: {
    fontSize: 12,
    opacity: 0.5,
  },
});
