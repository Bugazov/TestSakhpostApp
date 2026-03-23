import React, { PropsWithChildren } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { queryClient, queryPersister } from './query-client';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryPersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
