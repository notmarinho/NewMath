import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface ForumCardListProps {
  data: any;
  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
}

const ForumCardList: FC<ForumCardListProps> = ({
  data,
  refreshing,
  setRefreshing,
}) => {
  const user = auth().currentUser;

  const userUid = user?.uid;

  const deleteTopic = async (topicId: string) => {
    try {
      await firestore().collection('topics').doc(topicId).delete();
      Alert.alert('Tópico deletado com sucesso!');
      setRefreshing(true);
      // Aqui, você pode querer atualizar a lista para refletir a deleção
    } catch (error) {
      console.error('Erro ao deletar tópico: ', error);
      Alert.alert('Erro ao deletar tópico.');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data}
      onRefresh={onRefresh} // Adiciona a função de atualização
      refreshing={refreshing}
      renderItem={({item}) => (
        <View style={styles.card}>
          <View style={styles.body}>
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
      )}
    />
  );
};

export default ForumCardList;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#678983',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
  },
  body: {
    flex: 1,
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
});
