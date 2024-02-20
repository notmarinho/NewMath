import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC, useEffect} from 'react';
import Text from '../Text/Text';
import {useTheme} from 'react-native-paper';
import {Question} from '../../types';

type Props = {
  question: Question;
  setAnswer: (answer: string) => void;
};

const MultipleQuestion: FC<Props> = ({question, setAnswer}) => {
  const theme = useTheme();
  const [selectedAnswer, setSelectedAnswer] = React.useState('');

  useEffect(() => {
    if (selectedAnswer !== '') {
      setAnswer(selectedAnswer);
    }
  }, [selectedAnswer]);

  return (
    <View style={styles.container}>
      <Text type="title" style={styles.title}>
        {question.title}
      </Text>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedAnswer === option && {
              backgroundColor: theme.colors.primary,
            },
          ]}
          onPress={() => setSelectedAnswer(option)}>
          <Text
            type="largeTitle"
            color={selectedAnswer === option ? 'background' : 'primary'}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
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
  option: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MultipleQuestion;
