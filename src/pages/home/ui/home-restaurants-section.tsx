import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '@app/styles/theme';
import { useGetRestaurants } from '@entities/restaurant';
import { Restaurant } from '@entities/restaurant';
import { NearbyRestaurants } from '@widgets/nearby-restaurants';
import { SectionTitle, withRemoteData } from '@shared/ui';

type Props = {
  data: Restaurant[];
};

const HomeRestaurantsSectionContent = ({ data }: Props) => {
  return (
    <>
      <SectionTitle title="Недалеко от вас" />
      <NearbyRestaurants restaurants={data} />
    </>
  );
};

const HomeRestaurantsSectionWithRemote = withRemoteData<Restaurant[], object>(
  HomeRestaurantsSectionContent,
  {
    isEmpty: restaurants => !restaurants?.length,
    renderLoading: () => (
      <View style={styles.stateBox}>
        <ActivityIndicator color={colors.purple} size="large" />
      </View>
    ),
    renderError: () => (
      <View style={styles.stateBox}>
        <Text style={styles.errorText}>Не удалось загрузить рестораны</Text>
      </View>
    ),
  },
);

export const HomeRestaurantsSection = () => {
  const { data, isError, isPending } = useGetRestaurants();

  return (
    <HomeRestaurantsSectionWithRemote remote={{ data, isError, isPending }} />
  );
};

const styles = StyleSheet.create({
  stateBox: {
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
});
