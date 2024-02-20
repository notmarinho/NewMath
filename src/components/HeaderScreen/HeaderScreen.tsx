import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  title: string;
};

const HeaderScreen: FC<Props> = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.profileBox}>
        <Icon name="user-circle-o" size={40} color="#3D504C" />
      </View>
    </View>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000000',
  },
  textBox: {
    flex: 2,
    paddingHorizontal: 25,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileBox: {
    flex: 1,
    alignItems: 'center',
  },
});
