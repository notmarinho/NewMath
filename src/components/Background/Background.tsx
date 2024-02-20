import {SafeAreaView, StyleSheet} from 'react-native';
import React, {FC} from 'react';

type BackgroundProps = {
  children: React.ReactNode;
};

const Background: FC<BackgroundProps> = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Background;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EAD3',
    flex: 1,
  },
});
