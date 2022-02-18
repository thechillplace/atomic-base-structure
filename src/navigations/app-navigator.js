import React from 'react';
import {Home, About , Contact /* IMPORT SCREEN HERE */} from '_scenes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  stackAnimation: 'default',
};

const screens = [
  {
    name: 'Home',
    component: Home,
    options: {},
  },
  {
    name: 'About',
    component: About,
    options: {},
  },
  {
    name: 'Contact',
    component: Contact,
    options: {},
  },
  /* ADD SCREEN HERE */
];

const AppNavigator = () => {
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

export default AppNavigator;
