import { useCallback, useEffect, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, ScrollView } from 'react-native';

type Params = {
  topOffset: number;
  releaseDistance?: number;
  zoneTolerance?: number;
  lockMs?: number;
};

export const useTwoPointSnapScroll = ({
  topOffset,
  releaseDistance = 12,
  zoneTolerance = 80,
  lockMs = 280,
}: Params) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const dragStartOffsetRef = useRef(0);
  const autoSnappingRef = useRef(false);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onScrollBeginDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    dragStartOffsetRef.current = event.nativeEvent.contentOffset.y;
  }, []);

  const onSnap = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (autoSnappingRef.current) {
      return;
    }

    const offsetY = event.nativeEvent.contentOffset.y;
    const dragStartY = dragStartOffsetRef.current;
    const movedDown = offsetY - dragStartY;
    const movedUp = dragStartY - offsetY;

    if (offsetY <= 0) {
      return;
    }

    const isStartNearDefault = dragStartY <= zoneTolerance;
    const isStartNearTop = Math.abs(dragStartY - topOffset) <= zoneTolerance;

    let targetOffset: number | null = null;

    if (isStartNearDefault && movedDown > releaseDistance) {
      targetOffset = topOffset;
    } else if (isStartNearTop && movedUp > releaseDistance) {
      targetOffset = 0;
    } else if (offsetY > 0 && offsetY < topOffset) {
      targetOffset = offsetY < topOffset / 2 ? 0 : topOffset;
    }

    if (offsetY > topOffset + zoneTolerance) {
      targetOffset = null;
    }

    if (targetOffset === null || Math.abs(offsetY - targetOffset) < 2) {
      return;
    }

    autoSnappingRef.current = true;
    scrollRef.current?.scrollTo({ y: targetOffset, animated: true });

    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
    }

    unlockTimeoutRef.current = setTimeout(() => {
      autoSnappingRef.current = false;
      unlockTimeoutRef.current = null;
    }, lockMs);
  }, [lockMs, releaseDistance, topOffset, zoneTolerance]);

  useEffect(() => () => {
    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
    }
  }, []);

  return {
    scrollRef,
    onScrollBeginDrag,
    onScrollEndDrag: onSnap,
    onMomentumScrollEnd: onSnap,
  };
};
