import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useImperativeHandle, forwardRef} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {findClosestIndex} from '../../../utils/searching';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = ({children, positions}, _ref) => {
  useImperativeHandle(_ref, () => ({scrollTo, isActive}));

  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const color = useSharedValue(false);

  const scrollTo = useCallback(destination => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withTiming(destination, {duration: 200});
    color.value = withTiming(destination !== 0, {duration: 200});
  }, []);

  const _close = useCallback(() => {
    'worklet';
    translateY.value = withTiming(-10, {duration: 190}, () => {
      translateY.value = withTiming(0, {duration: 10}, () => {
        color.value = withTiming(false, {duration: 200}, () => {
          active.value = false;
        });
      });
    });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  const context = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(event => {
      const closest = findClosestIndex(positions, translateY.value * -1);
      if (positions[closest] === 0) {
        _close();
      } else {
        scrollTo(-positions[closest]);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  const rOverlayStyle = useAnimatedStyle(() => {
    const _translateY = interpolate(
      active.value,
      [false, true],
      [SCREEN_HEIGHT, 0],
      Extrapolate.CLAMP,
    );
    const _color = interpolateColor(
      color.value,
      [false, true],
      ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
    );
    return {
      backgroundColor: _color,
      transform: [{translateY: _translateY}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.overlay, rOverlayStyle]}>
        <TouchableOpacity onPress={_close} style={styles.overlay2} />
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  overlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  overlay: {
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomSheetContainer: {
    zIndex: 2,
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default forwardRef(BottomSheet);
