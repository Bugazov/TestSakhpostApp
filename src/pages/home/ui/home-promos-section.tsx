import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '@app/styles/theme';
import { useGetPromos, TPromoCard } from '@entities/promo';
import { PromoCarousel } from '@widgets/promo-carousel';
import { withRemoteData } from '@shared/ui';

type Props = {
  data: TPromoCard[];
};
const HomePromosSectionContent = ({ data }: Props) => {
  return <PromoCarousel promos={data} />;
};

const HomePromosSectionWithRemote = withRemoteData<TPromoCard[], object>(
  HomePromosSectionContent,
  {
    isEmpty: promos => !promos?.length,
    renderLoading: () => (
      <View style={styles.stateBox}>
        <ActivityIndicator color={colors.purple} size="large" />
      </View>
    ),
    renderError: () => (
      <View style={styles.stateBox}>
        <Text style={styles.errorText}>Не удалось загрузить акции</Text>
      </View>
    ),
  },
);

export const HomePromosSection = () => {
  const { data, isError, isPending } = useGetPromos();

  return <HomePromosSectionWithRemote remote={{ data, isError, isPending }} />;
};

const styles = StyleSheet.create({
  stateBox: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
});
