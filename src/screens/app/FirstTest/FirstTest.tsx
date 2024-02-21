import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, IconButton, useTheme} from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import {MultipleQuestionType, ProgressBar, Text} from '../../../components';
import {firstTestQuestions} from '../../../mocks/questions';
import {useNavigation} from '@react-navigation/native';
import {AppImages} from '../../../assets';

const FirstTest = () => {
  const theme = useTheme();

  const navigation = useNavigation();
  const [wrongSubjects, setWrongSubjects] = React.useState<string[]>([]);

  const pagerRef = React.useRef<PagerView>(null);
  const [page, setPage] = React.useState(0);
  const [answer, setAnswer] = React.useState('');

  const totalQuestions = firstTestQuestions.length;
  const progress = (page / totalQuestions) * 100;

  const checkAnswer = () => {
    const currentQuestion = firstTestQuestions[page];
    if (currentQuestion.answer !== answer) {
      setWrongSubjects([...wrongSubjects, currentQuestion.subject]);
    }
    navigateToNextQuestion();
  };

  const navigateToNextQuestion = () => {
    if (page < totalQuestions - 1) {
      pagerRef.current?.setPage(page + 1);
      setPage(page + 1);
    } else {
      navigation.navigate('FirstTestResult', {wrongSubjects});
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <View style={styles.headerContainer}>
        <IconButton icon="close" onPress={navigation.goBack} size={30} />
        <View style={styles.headerCenterContainer}>
          <Text color="primary" style={styles.pageText}>{`Questão ${
            page + 1
          } de ${totalQuestions}`}</Text>
          <ProgressBar progress={progress} />
        </View>

        <Image
          source={AppImages.logo}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <PagerView ref={pagerRef} style={styles.pagerView} initialPage={page}>
        {firstTestQuestions.map(question => {
          return (
            <MultipleQuestionType
              key={question.id}
              question={question}
              setAnswer={setAnswer}
            />
          );
        })}
      </PagerView>
      <View style={styles.buttonContainer}>
        <Button
          mode="text"
          // onPress={navigateToPreviousPage}
          icon="alert"
          style={styles.reportProblemButton}>
          Reportar Erro
        </Button>
        <Button
          mode="contained"
          onPress={checkAnswer}
          style={styles.verifyButton}
          theme={{colors: {primary: theme.colors.tertiary}}}>
          VERIFICAR
        </Button>
      </View>
    </View>
  );
};

export default FirstTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  headerContainer: {
    maxHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    gap: 8,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  pageText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerCenterContainer: {
    flex: 1,
    gap: 8,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  reportProblemButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButton: {
    alignSelf: 'flex-end',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // add a shadow to the button
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
