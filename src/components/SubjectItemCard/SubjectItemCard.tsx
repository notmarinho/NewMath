import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {useAuth} from '../../context';
import {Subject} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {AppScreenProps} from '../../screens/types';
import {useTheme} from 'react-native-paper';

type ScreenProps = AppScreenProps<'Home'>['navigation'];

const SubjectItemCard: FC<{subject: Subject}> = ({subject}) => {
  const theme = useTheme();
  const {userData} = useAuth();
  const navigation = useNavigation<ScreenProps>();

  const totalQuestions = subject.questions.length;
  const completedQuestions =
    userData?.answers_ids.filter(id =>
      subject.questions.map(question => question.id).includes(id),
    ).length || 0;

  const subjectPercentage = useMemo(() => {
    const isCompletedQuestionsNumber =
      !isNaN(completedQuestions) && completedQuestions !== null;
    const isTotalQuestionsNumber =
      !isNaN(totalQuestions) && totalQuestions !== null && totalQuestions > 0;

    if (isCompletedQuestionsNumber && isTotalQuestionsNumber) {
      return ((completedQuestions / totalQuestions) * 100).toFixed(0);
    }
    return '0';
  }, [completedQuestions, totalQuestions]);

  const isCompleted = !!userData?.finished_subjects_ids.includes(subject.id);

  return (
    <TouchableOpacity
      disabled={isCompleted}
      onPress={() =>
        navigation.navigate('Questionary', {
          subject_id: subject.id,
        })
      }
      style={styles.container}>
      <View
        style={[
          styles.subjectItemBox,
          {backgroundColor: theme.colors.primary},
        ]}>
        <Text style={{color: theme.colors.onPrimaryContainer}}>
          {isCompleted && '✅'}
        </Text>
      </View>

      <Text
        style={[
          {
            color: theme.colors.onPrimaryContainer,
          },
          styles.subjectItemText,
          isCompleted && styles.completedItemText,
        ]}>
        {subject.title}
      </Text>
      <Text>{isCompleted ? '100%' : `${subjectPercentage}%`}</Text>
    </TouchableOpacity>
  );
};

export default SubjectItemCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
    height: 44,
    alignItems: 'center',
  },
  subjectItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  completedItemText: {
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  subjectItemBox: {
    width: 35,
    aspectRatio: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
