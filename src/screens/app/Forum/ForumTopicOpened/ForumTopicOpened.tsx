import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Background, HeaderScreen} from '../../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

type ForumTopicOpenedProps = {
  route: {
    params: {
      item: {
        name: string;
        title: string;
        description: string;
        stars: number;
        userId: string;
        id: string;
      };
    };
  };
};

const ForumTopicOpened: FC<ForumTopicOpenedProps> = ({route}) => {
  const navigation = useNavigation();
  const user = auth().currentUser;
  const userUid = user?.uid;
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const {item} = route.params;

  const deleteTopic = async (topicId: string) => {
    try {
      await firestore().collection('topics').doc(topicId).delete();
      Alert.alert('Tópico deletado com sucesso!');
      navigation.goBack();
      // Aqui, você pode querer atualizar a lista para refletir a deleção
    } catch (error) {
      console.error('Erro ao deletar tópico: ', error);
      Alert.alert('Erro ao deletar tópico.');
    }
  };

  const addComent = async () => {
    // Aqui, você pode querer adicionar um comentário ao tópico
    try {
      await firestore()
        .collection('topics')
        .doc(item.id)
        .collection('comments')
        .add({
          name: user?.displayName,
          text: text,
          userId: userUid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setText('');
    } catch (error) {
      console.error('Erro ao adicionar comentário: ', error);
      Alert.alert('Erro ao adicionar comentário.');
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await firestore()
        .collection('topics')
        .doc(item.id)
        .collection('comments')
        .doc(commentId)
        .delete();
      Alert.alert('Comentário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar comentário: ', error);
      Alert.alert('Erro ao deletar comentário.');
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('topics')
      .doc(item.id)
      .collection('comments')
      .orderBy('createdAt', 'desc') // Assumindo que você quer os comentários mais recentes primeiro
      .onSnapshot(snapshot => {
        const fetchedComments: any = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      });

    return () => unsubscribe(); // Isso desinscreve do listener quando o componente é desmontado
  }, [item.id]);

  return (
    <Background style={styles.container}>
      <HeaderScreen title="Tópico" hasBackButton />
      <View style={styles.body}>
        <View style={styles.card}>
          <View>
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={4} style={styles.description}>
              {item.description}
            </Text>
          </View>
          <View style={styles.footer}>
            <Icon name="star" size={20} color="#F2EAD3" />
            <Text style={styles.textStar}>{item.stars}</Text>
            {item.userId === userUid && (
              <TouchableOpacity
                onPress={() => deleteTopic(item.id)}
                style={styles.deleteButton}>
                <Icon name="delete" size={25} color="#BB6262" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Comente..."
            value={text}
            onChangeText={setText}
            placeholderTextColor={'#678983'}
          />
          <TouchableOpacity style={styles.sendButton} onPress={addComent}>
            <Icon name="send" size={20} color="#678983" />
          </TouchableOpacity>
        </View>
        {/* FlatList de comentários */}
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
              <View style={styles.footerComment}>
                <Text style={styles.textDate}>
                  {item?.createdAt
                    ? item.createdAt.toDate().toLocaleDateString()
                    : 'Data não disponível'}
                </Text>
                {item.userId === userUid && (
                  <TouchableOpacity
                    onPress={() => deleteComment(item.id)}
                    style={styles.deleteButton}>
                    <Icon name="delete" size={20} color="#BB6262" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </Background>
  );
};

export default ForumTopicOpened;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 150,
  },
  body: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#678983',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
  },

  footer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2EAD3',
  },
  description: {
    color: '#F2EAD3',
    alignSelf: 'stretch',
  },
  textStar: {
    color: '#F2EAD3',
  },
  deleteButton: {
    marginLeft: 'auto', // Isso coloca o botão de deletar à direita
    padding: 10, // Fácil de tocar
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: 35,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    paddingLeft: 20,
    fontSize: 12,
  },
  inputBox: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sendButton: {
    width: 50,
    height: 35,
    // backgroundColor: '#D9D9D9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentContainer: {
    backgroundColor: '#fff', // Escolha uma cor de fundo para os comentários
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  commentText: {
    color: '#000', // Escolha uma cor para o texto dos comentários
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#678983', // Escolha uma cor para o nome do usuário
    marginTop: 5,
  },
  footerComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  textDate: {
    color: '#678983', // Escolha uma cor para a data
  },
});
