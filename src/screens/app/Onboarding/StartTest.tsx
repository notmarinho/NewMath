import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {useAuth} from '../../../context';
import {Button, useTheme} from 'react-native-paper';
import {AppScreenProps} from '../../types';
import {Text} from '../../../components';

import firestore from '@react-native-firebase/firestore';

type ScreenProps = AppScreenProps<'StartTest'>;

const StartTest: FC<ScreenProps> = ({navigation}) => {
  const {user, userData} = useAuth();

  const theme = useTheme();

  const doTestLater = () => {
    firestore().collection('users').doc(user?.uid).update({
      first_access: false,
      to_study: [],
    });
  };

  console.log(userData?.to_study);

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text type="largeTitle">Olá, {userData?.name}!</Text>
        <Text type="title">Vamos realizar seu teste?</Text>
        <Text>
          Tenha em mãos papel e lápis, pois você pode precisar resolver algumas
          questões à mão antes de selecionar a resposta correta.
        </Text>
        <Text>
          Agora você fará essa avaliação apenas uma vez. Com base em seu
          desempenho, você saberá qual o ponto de partida de seus estudos no New
          Math.
        </Text>

        <FlatList
          data={userData?.to_study}
          contentContainerStyle={{paddingVertical: 12}}
          keyExtractor={item => item}
          ListHeaderComponent={() => (
            <Text style={styles.subtitle}>
              Estes são os principais assuntos que você precisa estudar mais:
            </Text>
          )}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text>{item}</Text>
            </View>
          )}
        />
        <View style={styles.buttonsContainer}>
          {!userData?.first_access && (
            <Button
              mode="text"
              onPress={() => navigation.navigate('AssuntosStack')}>
              Estudar
            </Button>
          )}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('FirstTest')}>
            Realizar o Teste
          </Button>
          {userData?.first_access && (
            <Button mode="text" onPress={doTestLater}>
              Fazer Depois
            </Button>
          )}
        </View>
      </View>
    </>
  );
};

export default StartTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonsContainer: {
    marginTop: 'auto',
    gap: 8,
  },
  itemContainer: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
