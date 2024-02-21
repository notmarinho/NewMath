import {Image, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {AuthScreenProps} from '../../types';
import {Button, HelperText, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {AppError} from '../../../types';

import logoImage from '../../../assets/images/logo.png';
import {Background} from '../../../components';

type ScreenProps = AuthScreenProps<'SignIn'>;

type FormError = {
  email: AppError;
  password: AppError;
  app: AppError;
};

const emptyFormError: FormError = {
  email: null,
  password: null,
  app: null,
};

const SignInScreen: FC<ScreenProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formError, setFormError] = useState(emptyFormError);

  const validation = () => {
    setFormError(emptyFormError);
    const nextFormError = {...emptyFormError};

    if (!email) {
      nextFormError.email = 'Insira um email válido';
    }
    if (!password) {
      nextFormError.password = 'Insira uma senha válida';
    }

    const hasAnyError = Object.values(nextFormError).some(
      error => error !== null,
    );

    if (hasAnyError) {
      setFormError(nextFormError);
      return;
    }

    signInOnFirebase();
  };

  const handleRegisterError = (e: any) => {
    let errorMessage = e.message;

    switch (e.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Esse email já está em uso';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Insira um email válido';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Usuário ou senha incorretos';
        break;
      default:
        errorMessage = e.message;
        break;
    }

    setFormError(prev => ({
      ...prev,
      app: errorMessage,
    }));
  };

  const signInOnFirebase = async () => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(handleRegisterError)
      .finally(() => setIsLoading(false));
  };

  return (
    <Background style={styles.container}>
      <Image source={logoImage} />
      <View style={styles.inputsContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          mode="outlined"
          error={!!formError.email}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
          mode="outlined"
          error={!!formError.password}
        />
      </View>
      <HelperText type="error" visible={!!formError.app}>
        {formError.app}
      </HelperText>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={validation}
          loading={isLoading}
          contentStyle={styles.button}>
          Entrar
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('SignUp')}
          contentStyle={styles.button}>
          Registrar
        </Button>
      </View>
    </Background>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  inputsContainer: {
    alignSelf: 'stretch',
    gap: 8,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    gap: 8,
  },
  button: {
    height: 54,
  },
});
