import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Background, HeaderScreen} from '../../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

type ForumTopicOpenedProps = {
  route: {
    params: {
      item: {
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

  const {item} = route.params;

  console.log('item', item.title);

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
      </View>
    </Background>
  );
};

export default ForumTopicOpened;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
});
