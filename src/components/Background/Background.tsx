import {SafeAreaView, StyleSheet} from 'react-native';
import React, {FC} from 'react';

type BackgroundProps = {
  children: React.ReactNode;
  style?: object; // Indica que o style é um objeto, o que é mais preciso do que "any"
};

const Background: FC<BackgroundProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EAD3',
    flex: 1,
  },
});
