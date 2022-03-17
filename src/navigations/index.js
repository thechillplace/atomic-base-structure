import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import {cleanPersist} from '../store/persist-effect';

export default function App() {
  const isLogin = true;

  useEffect(() => {
    cleanPersist();
  }, []);

  return (
    <NavigationContainer>
      {isLogin ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
