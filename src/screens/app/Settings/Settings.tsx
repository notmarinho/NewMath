import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {AppScreenProps} from '../../types';
import {Icon, useTheme} from 'react-native-paper';
import {useAuth} from '../../../context';
import {Text} from '../../../components';
import {TouchableOpacity} from 'react-native';

type ScreenProps = AppScreenProps<'Settings'>;

const Settings: FC<ScreenProps> = () => {
  const theme = useTheme();

  const {signOut} = useAuth();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <TouchableOpacity
        onPress={signOut}
        style={[styles.cardItem, {backgroundColor: theme.colors.surface}]}>
        <Icon source="cog" size={26} />
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 54,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
});
