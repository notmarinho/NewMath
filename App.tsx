import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import Navigation from './src/screens';
import {store} from './src/store/redux';

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
}

export default App;
