import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {AppScreenProps} from '../../types';
import {useTheme} from 'react-native-paper';
import {useAuth} from '../../../context';
import {Background, HeaderScreen, Text} from '../../../components';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

type ScreenProps = AppScreenProps<'Settings'>;

const Settings: FC<ScreenProps> = () => {
  const theme = useTheme();

  const {signOut} = useAuth();

  return (
    <Background style={styles.container}>
      <HeaderScreen title="Configurações" hasBackButton />
      <View style={styles.body}>
        <TouchableOpacity onPress={() => {}} style={styles.cardItem}>
          <Icon2 name="user-edit" size={22} color={'#3D504C'} />
          <Text style={styles.text}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut} style={styles.cardItem}>
          <Icon name="log-out-outline" size={26} color={'#3D504C'} />
          <Text style={styles.text}>Sair</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 54,
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3D504C',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3D504C',
  },
});
