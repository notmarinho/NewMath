import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {AppScreenProps} from '../../types';
import {Questionary} from '../../../components';

type ScreenProps = AppScreenProps<'Questionary'>;

const QuestionaryScreen: FC<ScreenProps> = ({theme}) => {
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Questionary />
    </View>
  );
};

export default QuestionaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
