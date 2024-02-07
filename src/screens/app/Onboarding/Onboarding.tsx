import {StyleSheet, ImageBackground, StatusBar} from 'react-native';
import React, {FC} from 'react';
import {AppImages} from '../../../assets';
import {DefaultColors} from '../../../theme/colors';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {AppScreenProps} from '../../types';
import {Text} from '../../../components';

type ScreenProps = AppScreenProps<'Onboarding'>;

const Onboarding: FC<ScreenProps> = ({navigation}) => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={AppImages.newton} style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
          style={styles.bottomContainer}>
          <Text style={styles.title}>Enfrente os Desafios da Matemática</Text>
          <Text style={styles.label}>
            Cada problema não resolvido é uma oportunidade de fortalecimento.{' '}
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('StartTest')}
            style={styles.button}>
            Iniciar
          </Button>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    marginTop: 'auto',
    height: 200,
    backgroundColor: DefaultColors.colors.backdrop,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: DefaultColors.colors.background,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: DefaultColors.colors.background,
  },
  button: {marginTop: 'auto'},
});
