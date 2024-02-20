import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';

import {AppScreenProps} from '../../types';
import {
  useTheme,
  IconButton,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import {useAuth} from '../../../context';
import {Text} from '../../../components';
import {useQuestions} from '../../../hooks';

type ScreenProps = AppScreenProps<'Home'>;

const HomeScreen: FC<ScreenProps> = ({navigation}) => {
  const theme = useTheme();

  const {user} = useAuth();
  const {levels} = useQuestions();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.userHeaderContainer}>
        <View style={styles.userHeaderPhoto} />
        <Text style={styles.userHeaderName}>{user?.displayName}</Text>
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
          <View style={styles.resumeHeader} />
          <View
            style={[
              styles.resumeBody,
              {
                backgroundColor: theme.colors.background,
              },
            ]}>
            <FlatList
              data={levels}
              contentContainerStyle={styles.listContainer}
              renderItem={({item}) => (
                <View>
                  {item.subjects.map((subject, i) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Questionary', {
                          subject: subject.title,
                        })
                      }
                      key={`${subject.title}-${i}`}
                      style={styles.subjectItem}>
                      <View
                        style={[
                          styles.subjectItemBox,
                          {backgroundColor: theme.colors.primary},
                        ]}
                      />

                      <Text
                        style={[
                          {color: theme.colors.onPrimaryContainer},
                          styles.subjectItemText,
                        ]}>
                        {subject.title}
                      </Text>
                      <Text>0%</Text>
                    </TouchableOpacity>
                  ))}
                </View>
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
  subjectItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
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
    borderWidth: 1,
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
