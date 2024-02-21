import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, useTheme} from 'react-native-paper';

import firebase from '@react-native-firebase/firestore';
import {useAuth} from '../../../context';

const NUMBER_OF_QUESTIONS = 11;

const FirstTestResult = ({route, navigation}) => {
  const {user, userData} = useAuth();
  const wrongSubjects = route.params.wrongSubjects as string[];

  const wrongSubjectsCount = wrongSubjects.length;
  const percentage = ((wrongSubjectsCount / NUMBER_OF_QUESTIONS) * 100).toFixed(
    2,
  );

  const theme = useTheme();

  const onStudyPress = () => {
    if (userData?.first_access) {
      firebase().collection('users').doc(user?.uid).update({
        first_access: false,
        to_study: wrongSubjects,
      });
    }

    firebase().collection('users').doc(user?.uid).update({
      to_study: wrongSubjects,
    });

    navigation.navigate('AssuntosStack');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Text style={styles.subtitle}>Essa foi sua porcentagem de acerto</Text>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.secondary,
          },
        ]}>
        {percentage}%
      </Text>
      <Text style={[styles.subtitle]}>
        Este são os principais assuntos que você precisa estudar mais:
      </Text>
      <FlatList
        data={wrongSubjects}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
      <Button
        mode="contained"
        onPress={onStudyPress}
        style={{marginTop: 24}}
        labelStyle={{color: theme.colors.background}}>
        Estudar
      </Button>
    </View>
  );
};

export default FirstTestResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemText: {
    fontSize: 16,
  },
});
