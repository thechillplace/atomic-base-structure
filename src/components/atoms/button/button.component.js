import React from 'react';
import {Text, View} from 'react-native';

const Button = ({label = ''}) => {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
};

export default Button;
