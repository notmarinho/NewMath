import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, Pressable} from 'react-native';
import {Background, HeaderScreen} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Assuntos = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<any>([]);

  // Atualizei esta função para aceitar o item como parâmetro
  const onStudyButtonPress = (item: any) => {
    // Agora passando o item como parâmetro para a próxima tela
    navigation.navigate('WatchScreen', {item});
  };

  const getCategories = async () => {
    try {
      const snapshot = await firestore().collection('categories').get();
      const categoriesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    } catch (error) {
      console.error('Erro ao buscar categorias: ', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Background>
      <HeaderScreen title="Assuntos" />
      <View style={styles.body}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Pressable
              onPress={() => onStudyButtonPress(item)}
              style={styles.button}>
              <Text style={styles.text}>{item.title}</Text>
            </Pressable>
          )}
        />
      </View>
    </Background>
  );
};

export default Assuntos;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#678983',
    minHeight: 80,
    padding: 10,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30,
    marginBottom: 10, // Adicionado para espaçamento entre os itens
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    // alignItems: 'center', // Removido para permitir que os botões ocupem a largura total
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F2EAD3',
  },
});
