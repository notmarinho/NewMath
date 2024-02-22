import {Image, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {AuthScreenProps} from '../../types';
import {Button, HelperText, TextInput, useTheme} from 'react-native-paper';
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
  const theme = useTheme();

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
      <View
        style={[
          styles.backgroundSquare,
          {
            backgroundColor: theme.colors.tertiary,
          },
        ]}
      />
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.formContainer,
            {
              backgroundColor: theme.colors.background,
            },
          ]}>
          <Image
            source={logoImage}
            style={styles.logoImage}
            resizeMode="contain"
          />
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
              theme={{
                roundness: 15,
              }}
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
              theme={{
                roundness: 15,
              }}
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
              Cadastre-se
            </Button>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  backgroundSquare: {
    height: '50%',
    position: 'absolute',
    width: '100%',
    alignSelf: 'flex-start',
    zIndex: 3,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentContainer: {
    flex: 1,
    zIndex: 6,
    justifyContent: 'center',

    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 200,
    height: 120,
    alignSelf: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
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
