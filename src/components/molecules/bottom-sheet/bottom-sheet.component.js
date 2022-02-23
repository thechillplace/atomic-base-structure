import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useImperativeHandle, forwardRef} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
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

  const scrollTo = useCallback(destination => {
    'worklet';
    active.value = destination !== 0;

    translateY.value = withTiming(destination, {damping: 50, duration: 300});
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
      scrollTo(-positions[closest]);
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

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
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
