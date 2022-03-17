import React, {useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheet} from '_molecules';
import {WINDOW_HEIGHT} from '../../styles/mixins';

export default function Login() {
  const ref = useRef({BottomSheet: null}).current;

  const onPress = useCallback(() => {
    const isActive = ref?.BottomSheet?.isActive();
    if (isActive) {
      ref?.BottomSheet?.scrollTo(0);
    } else {
      ref?.BottomSheet?.scrollTo(-400);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <BottomSheet
          ref={node => (ref.BottomSheet = node)}
          positions={[0, 400, WINDOW_HEIGHT - 50]}>
          <View style={{flex: 1}} />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'tomato',
    opacity: 0.6,
  },
});
