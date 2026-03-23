import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';

import { colors } from '@app/styles/theme';
import { TPromoCard } from '@entities/promo/model/types';
import { PromoCard } from '@entities/promo/ui/promo-card';
import { useFadeInUp } from '@shared/lib/use-fade-in-up';

type Props = {
  promos: TPromoCard[];
};

const HERO_CARD_WIDTH = Dimensions.get('window').width;

export const PromoCarousel = ({ promos }: Props) => {
  const animatedStyle = useFadeInUp(80);
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem: ListRenderItem<TPromoCard> = ({ item }) => {
    return (
      <View style={styles.item}>
        <PromoCard promo={item} />
      </View>
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <View style={styles.carousel}>
        <FlatList
          horizontal
          data={promos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled
          nestedScrollEnabled
          bounces={false}
          contentContainerStyle={styles.content}
          snapToInterval={HERO_CARD_WIDTH}
          decelerationRate="fast"
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        />

        {promos.length > 1 && (
          <View pointerEvents="none" style={styles.thumbsWrap}>
            {promos.map((promo, index) => {
              const inputRange = [
                (index - 1) * HERO_CARD_WIDTH,
                index * HERO_CARD_WIDTH,
                (index + 1) * HERO_CARD_WIDTH,
              ];

              const animatedWidth = scrollX.interpolate({
                inputRange,
                outputRange: [6, 20, 6],
                extrapolate: 'clamp',
              });

              const animatedOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.55, 1, 0.55],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={promo.id}
                  style={[
                    styles.thumb,
                    {
                      width: animatedWidth,
                      opacity: animatedOpacity,
                    },
                  ]}
                />
              );
            })}
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
  },
  content: {
    paddingBottom: 18,
  },
  item: {
    width: HERO_CARD_WIDTH,
  },
  thumbsWrap: {
    position: 'absolute',
    bottom: 34,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  thumb: {
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
});
