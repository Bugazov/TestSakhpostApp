import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomePage } from '@pages/home';
import { AppProviders } from '@app/providers/with-providers';
import { colors } from '@app/styles/theme';

export const App = () => {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <HomePage />
      </AppProviders>
    </SafeAreaProvider>
  );
};
