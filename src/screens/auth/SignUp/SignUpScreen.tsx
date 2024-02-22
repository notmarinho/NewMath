import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppError} from '../../../types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Background, HeaderScreen} from '../../../components';

type FormError = {
  name: AppError;
  email: AppError;
  password: AppError;
  app: AppError;
};

const initialFormError: FormError = {
  name: null,
  email: null,
  password: null,
  app: null,
};

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [formsErrors, setFormsErrors] = useState<FormError>(initialFormError);
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    const nextFormsErrors = {...initialFormError};

    if (!email) {
      nextFormsErrors.email = 'Insira um email válido';
    }
    if (!password) {
      nextFormsErrors.password = 'Insira uma senha válida';
    }
    if (!name) {
      nextFormsErrors.name = 'Insira um nome válido';
    }

    const hasAnyError = Object.values(nextFormsErrors).some(
      error => error !== null,
    );

    if (hasAnyError) {
      setFormsErrors(nextFormsErrors);
      return;
    }

    registerOnFirebase();
  };

  const handleRegisterError = (e: any) => {
    if (e.code === 'auth/email-already-in-use') {
      setFormsErrors(prev => ({
        ...prev,
        email: 'Esse email já está em uso',
      }));
    }

    if (e.code === 'auth/invalid-email') {
      setFormsErrors(prev => ({
        ...prev,
        email: 'Insira um email válido',
      }));
    }

    setFormsErrors(prev => ({
      ...prev,
      app: e.message,
    }));
  };

  const handleRegisterSuccess = (
    nextUser: FirebaseAuthTypes.UserCredential,
  ) => {
    firestore().collection('users').doc(nextUser.user.uid).set({
      name,
      email,
      finished_subjects_ids: [],
      answers_ids: [],
      first_access: true,
    });

    nextUser.user.updateProfile({
      displayName: name,
    });
  };

  const registerOnFirebase = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(handleRegisterSuccess)
      .catch(handleRegisterError)
      .finally(() => setIsLoading(false));
  };

  return (
    <Background>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <HeaderScreen hasBackButton />
        <View style={styles.inputsContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={{width: 200, height: 100, alignSelf: 'center'}}
          />
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subTitle}>Seja bem-vindo(a)</Text>

          <TextInput
            style={[styles.input, !!formsErrors.name && styles.inputErrorStyle]}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={[
              styles.input,
              !!formsErrors.email && styles.inputErrorStyle,
            ]}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.input,
              !!formsErrors.password && styles.inputErrorStyle,
            ]}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {formsErrors.app && (
            <Text style={styles.errorText}>{formsErrors.app}</Text>
          )}
          <Pressable onPress={validation} style={styles.button}>
            <Text style={styles.buttonText}>
              {!isLoading ? 'Cadastrar' : 'Registrando...'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Background>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  contentContainer: {
    flex: 1,

    gap: 12,
  },
  inputsContainer: {
    gap: 8,
  },
  input: {
    borderWidth: 2,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingHorizontal: 5,
    color: '#949494',
    fontWeight: 'bold',
    borderColor: '#678983',
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  button: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#678983',
    alignSelf: 'center',
    width: '80%',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  inputErrorStyle: {
    borderColor: 'red',
  },
  buttonText: {
    color: '#F2EAD3',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
    color: '#678983',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#678983',
    marginBottom: 20,
  },
});
