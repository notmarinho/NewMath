import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import PagerView from 'react-native-pager-view';
import OpenQuestion from '../OpenQuestion/OpenQuestion';
import MultipleQuestion from '../MultipleQuestion/MultipleQuestion';
import {Question} from '../../types';
import {Button, IconButton, useTheme} from 'react-native-paper';
import {AppImages} from '../../assets';
import Text from '../Text/Text';
import {AppScreenProps} from '../../screens/types';
import {useNavigation} from '@react-navigation/native';

type NavigationProps = AppScreenProps<'Questionary'>['navigation'];

const Questionary = ({questions}: {questions: Question[]}) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const pagerRef = React.useRef<PagerView>(null);

  const [answer, setAnswer] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [numberOfWrongAnswers, setNumberOfWrongAnswers] = React.useState(0);

  const totalQuestions = questions.length;

  const navigateToNextPage = () => {
    if (answer === '') {
      Alert.alert('Resposta vazia', 'Digite uma resposta', [{text: 'OK'}]);
      return;
    }

    const correctAnswer = questions[page].answer;
    const isAnswerCorrect = answer === correctAnswer;

    if (page < totalQuestions - 1 && isAnswerCorrect) {
      pagerRef.current?.setPage(page + 1);
      setPage(prevPage => prevPage + 1);
      setAnswer('');
      setNumberOfWrongAnswers(0);
    } else {
      if (numberOfWrongAnswers >= 2) {
        Alert.alert(
          `Você errou ${numberOfWrongAnswers} vezes`,
          'Deseja ver a resposta?',
          [
            {
              text: 'Sim',
              onPress: () =>
                Alert.alert('Resposta correta', correctAnswer, [{text: 'OK'}]),
            },
            {text: 'Não', style: 'cancel'},
          ],
        );
        return;
      }

      Alert.alert('Resposta incorreta', 'Tente novamente', [{text: 'OK'}]);
      setNumberOfWrongAnswers(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconButton icon="close" onPress={navigation.goBack} size={30} />
        <View style={styles.headerCenterContainer}>
          <Text color="primary" style={styles.pageText}>{`Questão ${
            page + 1
          } de ${totalQuestions}`}</Text>
          <View
            style={[
              styles.headerProgressBarContainer,
              {backgroundColor: theme.colors.primary},
            ]}>
            <View
              style={[
                styles.headerProgressBar,
                {backgroundColor: theme.colors.tertiary},
              ]}
            />
          </View>
        </View>

        <Image
          source={AppImages.logo}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <PagerView ref={pagerRef} style={styles.pagerView} initialPage={page}>
        {questions.map((question, index) => {
          return (
            <View key={index} style={styles.page}>
              {question.type === 'aberta' ? (
                <OpenQuestion question={question} setAnswer={setAnswer} />
              ) : (
                <MultipleQuestion question={question} setAnswer={setAnswer} />
              )}
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
