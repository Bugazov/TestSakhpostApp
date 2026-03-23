import React, { memo, useCallback } from 'react';
import {
  Animated,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';

import { Restaurant } from '@entities/restaurant/model/types';
import { RestaurantCard } from '@entities/restaurant/ui';
import { useFadeInUp } from '@shared/lib/use-fade-in-up';

type Props = {
  restaurants: Restaurant[];
};

export const NearbyRestaurants = memo(({ restaurants }: Props) => {
  const animatedStyle = useFadeInUp(160);

  const renderItem: ListRenderItem<Restaurant> = useCallback(
    ({ item }) => <RestaurantCard restaurant={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  return (
    <Animated.View style={animatedStyle}>
      <View style={styles.list}>
        <FlatList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={7}
          updateCellsBatchingPeriod={16}
          contentContainerStyle={styles.content}
        />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  list: {
    marginTop: 2,
  },
  content: {
    paddingBottom: 2,
  },
});
