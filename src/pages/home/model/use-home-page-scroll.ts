import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { useTwoPointSnapScroll } from '@shared/lib/use-two-point-snap-scroll';

const PROMO_SECTION_HEIGHT = 452;
const PROMO_OVERLAY_OFFSET = 24;
const DOCK_ANIMATION_DISTANCE = 88;

export const useHomePageScroll = (insets: EdgeInsets) => {
  const [promoSectionHeight, setPromoSectionHeight] = useState(PROMO_SECTION_HEIGHT);
  const promoSnapOffset = Math.max(0, promoSectionHeight - PROMO_OVERLAY_OFFSET);
  const topInsetOffset = 0;

  const nativeScrollY = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    scrollRef,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
  } = useTwoPointSnapScroll({
    topOffset: promoSnapOffset,
    releaseDistance: 9,
    zoneTolerance: 92,
    lockMs: 150,
  });

  const handlePromoLayout = (event: LayoutChangeEvent) => {
    const height = Math.round(event.nativeEvent.layout.height);
    if (height > 0 && height !== promoSectionHeight) {
      setPromoSectionHeight(height);
    }
  };

  const dockAnimationStart = useMemo(
    () => Math.max(0, promoSnapOffset - DOCK_ANIMATION_DISTANCE),
    [promoSnapOffset],
  );

  const animatedTopRadius = scrollY.interpolate({
    inputRange: [dockAnimationStart, promoSnapOffset],
    outputRange: [28, 0],
    extrapolate: 'clamp',
  });

  const animatedTopPadding = scrollY.interpolate({
    inputRange: [dockAnimationStart, promoSnapOffset],
    outputRange: [16, insets.top + 16],
    extrapolate: 'clamp',
  });

  const animatedPromoTranslateY = nativeScrollY.interpolate({
    inputRange: [0, promoSnapOffset],
    outputRange: [0, promoSnapOffset],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: nativeScrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.setValue(event.nativeEvent.contentOffset.y);
        onScroll(event);
      },
    },
  );

  return {
    scrollRef,
    handleScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollEnd,
    handlePromoLayout,
    topInsetOffset,
    animatedPromoTranslateY,
    animatedTopRadius,
    animatedTopPadding,
    promoOverlayOffset: PROMO_OVERLAY_OFFSET,
  };
};
