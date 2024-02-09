import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';

import {AppScreenProps} from '../../types';
import {useTheme, IconButton, TouchableRipple} from 'react-native-paper';
import {useAuth} from '../../../context';
import {Text} from '../../../components';

type ScreenProps = AppScreenProps<'Home'>;

const HomeScreen: FC<ScreenProps> = ({navigation}) => {
  const theme = useTheme();

  const {user} = useAuth();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.userHeaderContainer}>
        <View style={styles.userHeaderPhoto} />
        <Text style={styles.userHeaderName}>{user?.displayName}</Text>
        <IconButton
          icon="cog"
          size={26}
          style={styles.cogIcon}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <TouchableRipple
        onPress={() => navigation.navigate('Questionary')}
        style={{marginTop: 20, padding: 20, borderRadius: 10}}>
        <Text>Start Questionary</Text>
      </TouchableRipple>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userHeaderPhoto: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
  },
  userHeaderName: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cogIcon: {
    marginLeft: 'auto',
  },
});
