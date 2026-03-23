import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '@app/styles/theme';
import { TPromoCard } from '@entities/promo/model/types';

type Props = {
  promo: TPromoCard;
};

export const PromoCard = React.memo(({ promo }: Props) => {
  return (
    <ImageBackground
      imageStyle={styles.image}
      source={{ uri: promo.imageUrl }}
      style={styles.card}
    >
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        locations={[0.1, 1]}
        style={styles.bottomGradient}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{promo.title}</Text>
      </View>
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  card: {
    height: 434,
    borderRadius: 0,
    overflow: 'visible',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 0,
  },
  overlay: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 52,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -28,
    height: 220,
    zIndex: 0,
  },
  subtitle: {
    color: colors.white,
    opacity: 0.95,
    fontSize: 14,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
