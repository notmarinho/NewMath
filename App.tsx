import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';

import AppTheme from './src/theme';

import Navigation from './src/screens';
import {store} from './src/store/redux';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthProvider} from './src/context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar hidden />
      <GestureHandlerRootView style={{flex: 1}}>
        <PaperProvider
          theme={colorScheme === 'dark' ? AppTheme.dark : AppTheme.default}>
          <SafeAreaProvider>
            <AuthProvider>
              <ReduxProvider store={store}>
                <Navigation />
              </ReduxProvider>
            </AuthProvider>
          </SafeAreaProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
