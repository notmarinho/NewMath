import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import PagerView from 'react-native-pager-view';
import MultipleQuestion from '../MultipleQuestion/MultipleQuestion';
import {Subject} from '../../types';
import {Button, IconButton, useTheme} from 'react-native-paper';
import {AppImages} from '../../assets';
import Text from '../Text/Text';
import {AppScreenProps} from '../../screens/types';
import {useNavigation, useRoute} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../context';
import ProgressBar from '../ProgressBar/ProgressBar';

type NavigationProps = AppScreenProps<'Questionary'>['navigation'];
type RouteProps = AppScreenProps<'Questionary'>['route'];

const Questionary = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const {user, userData} = useAuth();

  const [subject, setSubject] = React.useState<Subject | null>(null);
  const pagerRef = React.useRef<PagerView>(null);

  const [answer, setAnswer] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [numberOfWrongAnswers, setNumberOfWrongAnswers] = React.useState(0);

  const totalQuestionsCount = subject?.questions.length || 0;
  const completedQuestionsCount =
    userData?.answers_ids.filter(id =>
      subject?.questions.map(question => question.id).includes(id),
    ).length || 0;

  const pageIndex = completedQuestionsCount;
  const progress = (completedQuestionsCount / totalQuestionsCount) * 100;
  const currentQuestion = subject?.questions[pageIndex];

  const finishQuestionary = () => {
    registerAnswer();
    firestore()
      .collection('users')
      .doc(user?.uid)
      .set(
        {
          finished_subjects_ids: firestore.FieldValue.arrayUnion(subject?.id),
        },
        {merge: true},
      )
      .then(() => {
        navigation.goBack();
      });
  };

  const registerAnswer = () => {
    if (!currentQuestion?.id) {
      return console.error('No question id found');
    }

    firestore()
      .collection('users')
      .doc(user?.uid)
      .set(
        {
          answers_ids: firestore.FieldValue.arrayUnion(currentQuestion.id),
        },
        {merge: true},
      );
  };

  const validateAnswer = () => {
    if (!currentQuestion?.answer) {
      return console.error('No question answer found');
    }

    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      return true;
    }

    if (numberOfWrongAnswers >= 2) {
      Alert.alert(
        `Você errou ${numberOfWrongAnswers} vezes`,
        'Deseja ver a resposta?',
        [
          {
            text: 'Sim',
            onPress: () =>
              Alert.alert('Resposta correta', currentQuestion.answer, [
                {text: 'OK'},
              ]),
          },
          {text: 'Não', style: 'cancel'},
        ],
      );
      return false;
    }

    Alert.alert('Resposta incorreta', 'Tente novamente', [{text: 'OK'}]);
    setNumberOfWrongAnswers(prev => prev + 1);
    return false;
  };

  const moveToNextQuestion = () => {
    registerAnswer();
    setAnswer('');
    setNumberOfWrongAnswers(0);
  };

  useEffect(() => {
    pagerRef.current?.setPage(completedQuestionsCount);
    setPage(completedQuestionsCount);
  }, [completedQuestionsCount]);

  const navigateToNextPage = () => {
    if (answer === '') {
      Alert.alert('Resposta vazia', 'Digite uma resposta', [{text: 'OK'}]);
      return;
    }

    const isAnswerCorrect = validateAnswer();

    if (isAnswerCorrect) {
      const hasMoreQuestions = page < totalQuestionsCount - 1;

      if (hasMoreQuestions) {
        moveToNextQuestion();
      } else {
        finishQuestionary();
      }
    }
  };

  useEffect(() => {
    firestore()
      .collection('subjects')
      .doc(route.params.subject_id)
      .get()
      .then(res => {
        const nextSubject = res.data() as Subject;
        setSubject(nextSubject);
      });
  }, [route.params.subject_id]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconButton icon="close" onPress={navigation.goBack} size={30} />
        <View style={styles.headerCenterContainer}>
          <Text
            color="primary"
            style={
              styles.pageText
            }>{`Questão ${completedQuestionsCount} de ${totalQuestionsCount}`}</Text>
          <ProgressBar progress={progress} />
        </View>

        <Image
          source={AppImages.logo}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={completedQuestionsCount}>
        {subject?.questions.map((question, index) => {
          return (
            <View key={index} style={styles.page}>
              <MultipleQuestion question={question} setAnswer={setAnswer} />
            </View>
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
          onPress={navigateToNextPage}
          style={styles.verifyButton}
          theme={{colors: {primary: theme.colors.tertiary}}}>
          VERIFICAR
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    maxHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    gap: 8,
  },
  headerCenterContainer: {
    flex: 1,
    gap: 8,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerProgressBarContainer: {
    paddingRight: 20,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  headerProgressBar: {
    height: '100%',
    width: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  pageText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    // flex: 1,
  },
  buttonContainer: {
    padding: 20,
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
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
  reportProblemButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Questionary;
