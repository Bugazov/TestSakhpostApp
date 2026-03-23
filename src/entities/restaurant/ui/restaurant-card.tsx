import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@app/styles/theme';
import { Restaurant } from '@entities/restaurant/model/types';

type Props = {
  restaurant: Restaurant;
};

export const RestaurantCard = ({ restaurant }: Props) => {
  const imageUrl = restaurant.image?.url;
  const logoUrl = restaurant.logo?.url;
  const rating = Number(restaurant.rating || 0).toFixed(1);
  const ratingCountText = restaurant.ratingCount;
  const cuisine = 'Европейская кухня';

  return (
    <View style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity activeOpacity={0.8} style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
        {logoUrl ? (
          <View style={styles.logoWrap}>
            <Image source={{ uri: logoUrl }} style={styles.logo} />
          </View>
        ) : null}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.general_info.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{rating}</Text>
          {ratingCountText ? (
            <Text style={styles.ratingCount}> {ratingCountText}</Text>
          ) : null}
          <Text style={styles.dot}> • </Text>
          <Text style={styles.cuisine}>{cuisine}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    backgroundColor: colors.white,
    marginBottom: 14,
  },
  mediaWrap: {
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: 190,
    width: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 30,
    fontWeight: '500',
  },
  logoWrap: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.white,
    padding: 4,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  content: {
    paddingHorizontal: 2,
    paddingTop: 14,
    paddingBottom: 8,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#FDBA23',
    fontSize: 15,
    marginRight: 4,
  },
  rating: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  ratingCount: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  dot: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  cuisine: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
