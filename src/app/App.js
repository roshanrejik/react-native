import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from './store/store';
import AppRoute from './navigation/navigator';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppRoute />
      </SafeAreaProvider>
    </Provider>
  );
}
