import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useIsRestoring } from '@tanstack/react-query';

import { colors } from '@app/styles/theme';

export type RemoteDataState<TData> = {
  data?: TData;
  isPending: boolean;
  isError: boolean;
};

type WithRemoteDataProps<TData> = {
  remote: RemoteDataState<TData>;
};

type WithRemoteDataOptions<TData> = {
  renderLoading?: () => React.ReactElement;
  renderError?: () => React.ReactElement;
  isEmpty?: (data: TData | undefined) => boolean;
};

const DefaultLoading = () => (
  <View style={styles.centered}>
    <ActivityIndicator color={colors.purple} size="large" />
  </View>
);

const DefaultError = () => (
  <View style={styles.centered}>
    <Text style={styles.errorText}>Не удалось загрузить данные</Text>
  </View>
);

export const withRemoteData = <TData, TProps extends object>(
  Component: React.ComponentType<TProps & { data: TData }>,
  options?: WithRemoteDataOptions<TData>,
) => {
  const Wrapped = (props: TProps & WithRemoteDataProps<TData>) => {
    const { remote, ...restProps } = props;
    const { data, isError, isPending } = remote;
    const isRestoring = useIsRestoring();
    const isEmpty = options?.isEmpty?.(data) ?? !data;
    const hasData = !isEmpty;

    if (isRestoring && !hasData) {
      return null;
    }

    // Keep stale or hydrated cache visible while a background request is pending.
    if (isPending && !hasData) {
      return options?.renderLoading?.() ?? <DefaultLoading />;
    }

    if ((isError && !hasData) || isEmpty) {
      return options?.renderError?.() ?? <DefaultError />;
    }

    return <Component {...(restProps as TProps)} data={data as TData} />;
  };

  Wrapped.displayName = `withRemoteData(${Component.name ?? 'Component'})`;

  return Wrapped;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
});
