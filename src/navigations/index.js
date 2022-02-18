import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';

export default function App() {
  const isLogin = false;
  return (
    <NavigationContainer>
      {isLogin ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
