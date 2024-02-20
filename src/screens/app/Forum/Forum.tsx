import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {ForumFilter, HeaderScreen} from '../../../components';
import ForumCardList from '../../../components/ForumCardList/ForumCardList';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {AppScreenProps} from '../../types';
import firestore from '@react-native-firebase/firestore';

const initialCardList = [
  {
    title: 'Funções',
    description:
      'Uma função matemática é uma relação entre um conjunto de entradas (domínio) e um conjunto correspondente de saídas...',
    stars: 5,
  },
];

type ScreenProps = AppScreenProps<'Forum'>;

const Forum: FC<ScreenProps> = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [filteredCardList, setFilteredCardList] = useState(initialCardList);
  const [refreshing, setRefreshing] = useState(false);

  const onAddPress = () => navigation.navigate('CreateForumTopic');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // Ordena os documentos pelo campo 'createdAt' em ordem descendente
        const snapshot = await firestore()
          .collection('topics')
          .orderBy('createdAt', 'desc')
          .get();

        const topicsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Assegura que o campo 'createdAt' seja convertido corretamente, se necessário
          createdAt: doc.data().createdAt?.toDate
            ? doc.data().createdAt.toDate()
            : doc.data().createdAt,
        }));

        // Aplica a filtragem, se houver pesquisa
        if (search) {
          const filteredData = topicsList.filter(
            card =>
              card.title.toLowerCase().includes(search.toLowerCase()) ||
              card.description.toLowerCase().includes(search.toLowerCase()),
          );
          setFilteredCardList(filteredData);
        } else {
          setFilteredCardList(topicsList);
        }
      } catch (error) {
        console.error('Erro ao buscar tópicos: ', error);
      }
      setRefreshing(false);
    };

    fetchTopics();
  }, [search, refreshing]);

  return (
    <View style={styles.container}>
      <HeaderScreen title={'Fórum de discussões'} />
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <ForumFilter selected={selected} setSelected={setSelected} />
      <ForumCardList
        data={filteredCardList}
        refreshing={refreshing}
        setRefreshing={setRefreshing}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Icon name="plus" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Forum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAD3',
  },
  header: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchInput: {
    height: 35,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    paddingLeft: 20,
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tabText: {
    color: 'grey',
  },
  tabTextActive: {
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
  },
  addButton: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
