import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { PanGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -height;       // Tam açılma (en yukarı)
const MIN_TRANSLATE_Y = -height / 5;   // Minimize (alttan görünen kısmı)

const BottomSheet = ({ children }) => {
  // Sheet pozisyonu
  const translationY = useSharedValue(0);
  // Scroll offset
  const scrollOffsetY = useSharedValue(0);
  // Refs
  const handleRef = useRef();
  const scrollRef = useRef();

  // ScrollView offset yakalayıcı
  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      scrollOffsetY.value = e.contentOffset.y;
    },
  });

  // Sheet’i hedefe spring’le götür
  const snapTo = useCallback(dest => {
    'worklet';
    translationY.value = withSpring(dest, { damping: 50 });
  }, []);

  // Açılışta 1/3 açık pozisyon
  useEffect(() => {
    snapTo(-height / 2.8);
  }, [snapTo]);

  // Sadece handle’ı sürüklemek için gesture
  const gesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translationY.value;
    },
    onActive: (e, ctx) => {
      let next = ctx.startY + e.translationY;
      next = Math.max(next, MAX_TRANSLATE_Y);
      next = Math.min(next, MIN_TRANSLATE_Y);
      translationY.value = next;
    },
    onEnd: () => {
      const mid = (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;
      if (translationY.value < mid) {
        snapTo(MAX_TRANSLATE_Y);   // tam aç
      } else {
        snapTo(MIN_TRANSLATE_Y);   // minimize
      }
    },
  });

  // Animated stil
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value }],
    borderRadius: interpolate(
      translationY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View style={[styles.container, rStyle]}>
      {/* 1) Sadece bu handle alanı PanGestureHandler ile sarıyoruz */}
      <PanGestureHandler
        ref={handleRef}
        onGestureEvent={gesture}
        simultaneousHandlers={scrollRef}
      >
        <Animated.View style={styles.handle}>
          <View style={styles.line} />
        </Animated.View>
      </PanGestureHandler>

      {/* 2) Geri kalan tüm alanı ScrollView yapıyoruz */}
      <NativeViewGestureHandler
        ref={scrollRef}
        simultaneousHandlers={handleRef}
      >
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {children}
        </Animated.ScrollView>
      </NativeViewGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height,
    width: '100%',
    height,
    backgroundColor: 'white',
  },
  handle: {
    // Handle’ın yüksekliği: kullanıcı burayı sürükler
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'gray',
    borderRadius: 2,
  },
});

export default BottomSheet;
