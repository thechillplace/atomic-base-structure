import React from 'react';
import {Login} from '_scenes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  stackAnimation: 'default',
};

const screens = [
  {
    name: 'Login',
    component: Login,
    options: {},
  },
];

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      {screens.map(e => (
        <Stack.Screen
          name={e.name}
          key={e.name}
          component={e.component}
          options={{...defaultScreenOptions, ...e.options}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
