import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Background, HeaderScreen} from '../../../components';

type Props = {};

const CreateForumTopic: FC<Props> = ({theme}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Background>
      <HeaderScreen title="Criar Tópico" hasBackButton />
      <View style={styles.body}>
        <View>
          <Text style={styles.text}>Assunto</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Escreva o título"
            placeholderTextColor={'#678983'}
          />
        </View>
        <View>
          <Text style={styles.text}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Escreva a descrição"
            placeholderTextColor={'#678983'}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Postar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default CreateForumTopic;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 25,
    gap: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
    paddingLeft: 10,
  },

  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    backgroundColor: '#678983',
    paddingHorizontal: 40,
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  descriptionInput: {height: 150, textAlignVertical: 'top'},
});
