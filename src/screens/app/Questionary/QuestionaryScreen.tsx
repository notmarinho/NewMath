import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {AppScreenProps} from '../../types';
import {Questionary} from '../../../components';
import {trigonometryQuestions} from '../../../mocks/questions';

type ScreenProps = AppScreenProps<'Questionary'>;

const QuestionaryScreen: FC<ScreenProps> = ({theme}) => {
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Questionary questions={trigonometryQuestions} />
    </View>
  );
};

export default QuestionaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
