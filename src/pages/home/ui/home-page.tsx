import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@app/styles/theme';
import { useHomePageScroll } from '../model';
import { HomePromosSection } from './home-promos-section';
import { HomeRestaurantsSection } from './home-restaurants-section';

export const HomePage = () => {
  const insets = useSafeAreaInsets();
  const {
    scrollRef,
    handleScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
    handlePromoLayout,
    animatedPromoTranslateY,
    animatedTopRadius,
    animatedTopInsetShift,
    promoOverlayOffset,
  } = useHomePageScroll(insets);

  return (
    <View style={styles.screen}>
      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled
        style={styles.scrollLayer}
        onScrollBeginDrag={onScrollBeginDrag}
        onScroll={handleScroll}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: animatedPromoTranslateY }],
          }}
          onLayout={handlePromoLayout}
        >
          <HomePromosSection />
        </Animated.View>
        <Animated.View
          style={[
            styles.sectionOverlay,
            { marginTop: -promoOverlayOffset },
            {
              borderTopLeftRadius: animatedTopRadius,
              borderTopRightRadius: animatedTopRadius,
            },
          ]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: animatedTopInsetShift }],
            }}
          >
            <HomeRestaurantsSection />
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollLayer: {
    flex: 1,
  },
  sectionOverlay: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.white,
  },
});
