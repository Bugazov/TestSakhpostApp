import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { useTwoPointSnapScroll } from '@shared/lib/use-two-point-snap-scroll';

const PROMO_SECTION_HEIGHT = 452;
const PROMO_OVERLAY_OFFSET = 24;
const DOCK_ANIMATION_DISTANCE = 88;

export const useHomePageScroll = (insets: EdgeInsets) => {
  const [promoSectionHeight, setPromoSectionHeight] = useState(PROMO_SECTION_HEIGHT);
  const promoSnapOffset = Math.max(0, promoSectionHeight - PROMO_OVERLAY_OFFSET);

  const nativeScrollY = useRef(new Animated.Value(0)).current;

  const {
    scrollRef,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
  } = useTwoPointSnapScroll({
    topOffset: promoSnapOffset,
    releaseDistance: 9,
    zoneTolerance: 92,
    lockMs: 100,
  });

  const handlePromoLayout = useCallback((event: LayoutChangeEvent) => {
    const height = Math.round(event.nativeEvent.layout.height);
    if (height > 0 && height !== promoSectionHeight) {
      setPromoSectionHeight(height);
    }
  }, [promoSectionHeight]);

  const dockAnimationStart = useMemo(
    () => Math.max(0, promoSnapOffset - DOCK_ANIMATION_DISTANCE),
    [promoSnapOffset],
  );

  const animatedTopRadius = nativeScrollY.interpolate({
    inputRange: [dockAnimationStart, promoSnapOffset],
    outputRange: [28, 0],
    extrapolate: 'clamp',
  });

  const animatedTopInsetShift = nativeScrollY.interpolate({
    inputRange: [dockAnimationStart, promoSnapOffset],
    outputRange: [0, insets.top],
    extrapolate: 'clamp',
  });

  const animatedPromoTranslateY = nativeScrollY.interpolate({
    inputRange: [0, promoSnapOffset],
    outputRange: [0, promoSnapOffset],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: nativeScrollY } } }],
    { useNativeDriver: true },
  );

  return {
    scrollRef,
    handleScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
    handlePromoLayout,
    animatedPromoTranslateY,
    animatedTopRadius,
    animatedTopInsetShift,
    promoOverlayOffset: PROMO_OVERLAY_OFFSET,
  };
};
