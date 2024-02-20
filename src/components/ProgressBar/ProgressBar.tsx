import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
  const theme = useTheme();

  // Animated value for progress width
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Calculate the width of the progress bar based on completed questions
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false, // `false` because we're animating a non-transform property (width)
    }).start();
  }, [progress]);

  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'], // Interpolate width from 0% to 100%
  });

  return (
    <View
      style={[
        styles.headerProgressBarContainer,
        {backgroundColor: theme.colors.primary},
      ]}>
      <Animated.View
        style={[
          styles.headerProgressBar,
          {backgroundColor: theme.colors.tertiary, width: `${progress}%`},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerProgressBarContainer: {
    height: 20,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerProgressBar: {
    height: '100%',
    borderRadius: 10,
  },
});

export default ProgressBar;
