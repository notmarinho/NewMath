import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {OpenQuestionType} from '../../types';
import {TextInput} from 'react-native-paper';
import Text from '../Text/Text';

type Props = {
  question: OpenQuestionType;
  setAnswer: (answer: string) => void;
};

const OpenQuestion: FC<Props> = ({question, setAnswer}) => {
  return (
    <View style={styles.container}>
      <Text type="title" style={styles.title}>
        {question.title}
      </Text>
      <TextInput
        placeholder="Digite sua resposta aqui"
        onChangeText={setAnswer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default OpenQuestion;
