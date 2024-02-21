import {Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppError} from '../../../types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Button, TextInput} from 'react-native-paper';

type FormError = {
  name: AppError;
  email: AppError;
  password: AppError;
  app: AppError;
};

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [formsErrors, setFormsErrors] = useState<FormError>({
    name: null,
    email: null,
    password: null,
    app: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    const nextFormsErrors = {...formsErrors};

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
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          error={!!formsErrors.name}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!formsErrors.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={!!formsErrors.password}
        />
      </View>
      {formsErrors.app && (
        <Text style={styles.errorText}>{formsErrors.app}</Text>
      )}
      <Button
        onPress={validation}
        loading={isLoading}
        disabled={isLoading}
        contentStyle={styles.button}
        mode="contained">
        {!isLoading ? 'Cadastrar' : 'Registrando...'}
      </Button>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  inputsContainer: {
    gap: 8,
    alignSelf: 'stretch',
  },
  input: {
    borderWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#303030',
    borderColor: '#e8e8e8',
    height: 54,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  button: {
    height: 54,
  },
});
