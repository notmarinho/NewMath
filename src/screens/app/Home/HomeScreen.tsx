import {StyleSheet, View, TouchableOpacity, SectionList} from 'react-native';
import React, {FC, useMemo} from 'react';

import {AppScreenProps} from '../../types';
import {useTheme, IconButton, Button} from 'react-native-paper';
import {useAuth} from '../../../context';
import {Text} from '../../../components';
import {useQuestions} from '../../../hooks';

type ScreenProps = AppScreenProps<'Home'>;

const HomeScreen: FC<ScreenProps> = ({navigation}) => {
  const theme = useTheme();

  const {userData} = useAuth();
  const {levels, subjects} = useQuestions();

  const allQuestionsCount = useMemo(() => {
    if (subjects) {
      const sanitizedSubjects = subjects.filter(subject => !!subject.questions);
      return sanitizedSubjects.reduce(
        (acc, subject) => acc + subject.questions.length,
        0,
      );
    }
    return 0;
  }, [subjects]);

  const allQuestionsAnsweredCount = useMemo(() => {
    if (userData?.answers_ids) {
      return userData.answers_ids.length;
    }
    return 0;
  }, [userData]);

  const percentage = (
    (allQuestionsAnsweredCount / allQuestionsCount) *
    100
  ).toFixed(0);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.userHeaderContainer}>
        <View style={styles.userHeaderPhoto} />
        <Text style={styles.userHeaderName}>{userData?.name}</Text>
        <IconButton
          icon="cog"
          size={26}
          style={styles.cogIcon}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <View style={styles.body}>
        <View
          style={[
            styles.resumeContainer,
            {backgroundColor: theme.colors.primary},
          ]}>
          <View style={styles.resumeHeader}>
            <View
              style={[
                styles.totalPercentageContainer,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.onSurface,
                },
              ]}>
              <Text style={styles.totalPercentageText}>{percentage}%</Text>
            </View>
          </View>
          <View
            style={[
              styles.resumeBody,
              {
                backgroundColor: theme.colors.background,
              },
            ]}>
            <SectionList
              sections={levels.map(level => ({
                title: level.title,
                data: subjects.filter(
                  subject =>
                    subject.level_id === level.id && !!subject.questions,
                ),
              }))}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({item}) => {
                const totalQuestions = item.questions.length;
                const completedQuestions =
                  userData?.answers_ids.filter(id =>
                    item.questions.map(question => question.id).includes(id),
                  ).length || 0;

                const percentage = (
                  (completedQuestions / totalQuestions) *
                  100
                ).toFixed(0);

                const isCompleted = !!userData?.finished_subjects_ids.includes(
                  item.id,
                );

                return (
                  <TouchableOpacity
                    disabled={isCompleted}
                    onPress={() =>
                      navigation.navigate('Questionary', {
                        subject_id: item.id,
                      })
                    }
                    style={styles.subjectItem}>
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
                      {item.title}
                    </Text>
                    <Text>{isCompleted ? '100%' : `${percentage}%`}</Text>
                  </TouchableOpacity>
                );
              }}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.sectionHeaderTitle}>{title}</Text>
              )}
            />
          </View>

          <View style={styles.resumeFooter}>
            <Button mode="elevated" onPress={() => console.log('Pressed')}>
              Resumo
            </Button>
            <Button mode="elevated" onPress={() => console.log('Pressed')}>
              Desempenho
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userHeaderPhoto: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
  },
  userHeaderName: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cogIcon: {
    marginLeft: 'auto',
  },
  listContainer: {
    paddingTop: 20,
  },
  subjectItem: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
    height: 44,
    alignItems: 'center',
  },
  totalPercentageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    transform: [
      {
        translateY: -45,
      },
    ],
  },
  totalPercentageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 12,
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeContainer: {
    width: 330,
    height: 380,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  resumeHeader: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-end',
  },
  resumeBody: {
    alignSelf: 'stretch',
    flex: 3,
    borderRadius: 20,
  },
  resumeFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
  },
});
