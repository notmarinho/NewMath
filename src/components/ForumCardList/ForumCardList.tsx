import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Foundation';

interface ForumCardListProps {
  data: any;
}

const ForumCardList: FC<ForumCardListProps> = ({data}) => {
  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.card}>
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
          </View>
        </TouchableOpacity>
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
    alignItems: 'flex-end',
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
});
