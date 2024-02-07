import {StatusBar, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {useAuth} from '../../../context';
import {Button, useTheme} from 'react-native-paper';
import {AppScreenProps} from '../../types';
import {Text} from '../../../components';

type ScreenProps = AppScreenProps<'StartTest'>;

const StartTest: FC<ScreenProps> = ({navigation}) => {
  const {user} = useAuth();

  const theme = useTheme();

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text type="largeTitle">Olá, {user?.displayName}!</Text>
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
        <View style={styles.buttonsContainer}>
          <Button mode="contained">Realizar o Teste</Button>
          <Button mode="text" onPress={() => navigation.navigate('Home')}>
            Fazer Depois
          </Button>
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
});
