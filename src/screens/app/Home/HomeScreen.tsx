import {StyleSheet, View, SectionList} from 'react-native';
import React, {FC, useMemo} from 'react';

import {AppScreenProps} from '../../types';
import {useTheme, IconButton, Button, Icon} from 'react-native-paper';
import {useAuth} from '../../../context';
import {SubjectItemCard, Text} from '../../../components';
import {useQuestions} from '../../../hooks';
import {Image} from 'react-native';

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

  const percentage = useMemo(() => {
    if (isNaN(allQuestionsAnsweredCount) || isNaN(allQuestionsCount)) {
      return 0;
    }

    return ((allQuestionsAnsweredCount / allQuestionsCount) * 100).toFixed(0);
  }, [allQuestionsAnsweredCount, allQuestionsCount]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.userHeaderContainer}>
        <View style={styles.userHeaderPhoto}>
          <Image
            source={{
              uri: 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg',
            }}
            style={{flex: 1}}
          />
        </View>
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
            <View style={{flexDirection: 'row', gap: 8}}>
              <Icon
                source="chart-bar"
                size={26}
                color={theme.colors.background}
              />
              <Text
                style={[
                  {color: theme.colors.background},
                  styles.titleExercicios,
                ]}>
                Exercícios
              </Text>
            </View>

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
              renderItem={({item}) => <SubjectItemCard subject={item} />}
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
  titleExercicios: {
    transform: [{translateY: 2}],
    fontWeight: 'bold',
    fontSize: 18,
  },
  userHeaderContainer: {
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userHeaderPhoto: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
