import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {HeaderScreen} from '../../../components';

type Props = {};

const CreateForumTopic: FC<Props> = ({theme}) => {
  return (
    <View style={styles.container}>
      <HeaderScreen title="Criar Tópico" hasBackButton />
    </View>
  );
};

export default CreateForumTopic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
