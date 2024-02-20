import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  selected: number;
  setSelected: (index: number) => void;
};

const list = [{name: 'Todos'}, {name: 'Recentes'}, {name: 'Não resolvidos'}];

const ForumFilter: FC<Props> = ({selected, setSelected}) => {
  return (
    <View style={styles.tabContainer}>
      {list.map((item, index) => (
        <TouchableOpacity
          key={item.name}
          style={[styles.button, selected === index && styles.buttonSelected]}
          onPress={() => setSelected(index)}
          activeOpacity={0.7}>
          <Text
            style={[styles.tabText, selected === index && styles.textSelected]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ForumFilter;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#D9D9D9', // Fundo padrão para botões não selecionados
  },
  buttonSelected: {
    backgroundColor: '#678983', // Cor de fundo para o botão selecionado
    borderWidth: 2,
    borderColor: '#678983',
  },
  tabText: {
    color: 'grey', // Cor do texto para botões não selecionados
  },
  textSelected: {
    color: 'white', // Cor do texto para o botão selecionado
  },
});
