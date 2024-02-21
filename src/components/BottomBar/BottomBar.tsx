import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {View, TouchableOpacity, Animated, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const circleDiameter = 80; // Tornar isto uma constante global para facilitar ajustes

const CustomTabBar = ({
  state,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const [width, setWidth] = useState(0);
  const translating = useRef(new Animated.Value(0)).current;
  const translateY = state.routes.map(
    () => useRef(new Animated.Value(0)).current,
  );
  const totalWidth = width / state.routes.length;
  const marginHorizontal = (totalWidth - circleDiameter) / 2;

  // Atualiza a lógica de animação para lidar com a seleção e desseleção de ícones
  const animateIcons = useCallback(() => {
    translateY.forEach((animValue: any, index: number) => {
      Animated.spring(animValue, {
        toValue: state.index === index ? -15 : 0, // Eleva se for o ícone selecionado, senão retorna para 0
        useNativeDriver: true,
      }).start();
    });
  }, [state.index, translateY]);

  useEffect(() => {
    animateIcons();
  }, [state.index, animateIcons]);

  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);

  const animateSlider = useCallback(
    (index: number) => {
      Animated.spring(translating, {
        toValue: index * totalWidth + marginHorizontal,
        useNativeDriver: true,
      }).start();
    },
    [totalWidth, marginHorizontal, translating],
  );

  const styles = useMemo(
    () => createStyles(circleDiameter),
    [circleDiameter, totalWidth],
  );

  return (
    <View
      style={styles.container}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <Animated.View
        style={[styles.circle, {transform: [{translateX: translating}]}]}
      />
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const icon =
          route.name === 'HomeStack'
            ? 'home'
            : route.name === 'AssuntosStack'
            ? 'book'
            : route.name === 'StartTest'
            ? 'flask'
            : route.name === 'Settings'
            ? 'settings'
            : route.name === 'Questionary'
            ? 'pencil-sharp'
            : route.name === 'ForumStack'
            ? 'chatbox-sharp'
            : 'home';

        const onPress = () => {
          animateSlider(index);
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}>
            <Animated.View
              style={{transform: [{translateY: translateY[index]}]}}>
              <Ionicons name={icon} size={30} color="#C89E32" />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (circleDiameter: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      backgroundColor: '#3D504C', // Cor de fundo para a barra de abas
      elevation: 5, // Sombra para Android
      shadowColor: '#000', // Sombra para iOS
      shadowOffset: {width: 0, height: -1}, // Sombra para iOS
      shadowOpacity: 0.1, // Sombra para iOS
      shadowRadius: 3, // Sombra para iOS
    },
    circle: {
      position: 'absolute',
      bottom: 10, // Ajuste conforme necessário para alinhar com a barra
      height: circleDiameter,
      width: circleDiameter,
      backgroundColor: '#3D504C', // Cor do círculo animado
      borderRadius: circleDiameter / 2,
      borderColor: '#F2EAD3', // Cor da borda do círculo
      borderWidth: 6,
    },
    tabButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10, // Ajuste para o padding inferior se necessário
    },
    iconFocused: {
      transform: [{translateY: -15}], // Eleva o ícone quando focado
    },
    text: {
      color: 'gray', // Cor do texto não focado
    },
    textFocused: {
      color: 'black', // Cor do texto focado
      transform: [{translateY: -15}], // Eleva o texto quando focado
    },
  });

export default CustomTabBar;
