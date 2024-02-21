import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, useTheme} from 'react-native-paper';

const FirstTestResult = ({route, navigation}) => {
  const wrongSubjects = route.params.wrongSubjects as string[];

  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.primary,
          },
        ]}>
        Este são os principais assuntos que você precisa estudar mais:
      </Text>
      <FlatList
        data={wrongSubjects}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Assuntos')}
        style={{marginTop: 24}}
        labelStyle={{color: theme.colors.background}}>
        Estudar
      </Button>
    </View>
  );
};

export default FirstTestResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemText: {
    fontSize: 16,
  },
});
