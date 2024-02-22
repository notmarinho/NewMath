import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import UserIcon from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';

type Props = {
  title?: string;
  hasBackButton?: boolean;
};

const HeaderScreen: FC<Props> = ({title, hasBackButton}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.textBox, hasBackButton && styles.withBackButton]}>
        {hasBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="leftcircle" size={40} color="#678983" />
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
      {!hasBackButton && (
        <View style={styles.profileBox}>
          <UserIcon name="user-circle-o" size={40} color="#678983" />
        </View>
      )}
    </View>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
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
  withBackButton: {
    // height: 100,
    marginBottom: 20,
    paddingTop: 30,
    gap: 20,
  },
});
