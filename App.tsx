import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './src/screens';
import {store} from './src/store/redux';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <Navigation />
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

export default App;
