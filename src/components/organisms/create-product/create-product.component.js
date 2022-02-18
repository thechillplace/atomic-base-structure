import React from 'react';
import {View, Text} from 'react-native';
import styles from './create-product.style.js';

const CreateProduct = ({label = ''}) => {
  return (
    <View style={styles.container}>
      <Text>CreateProduct</Text>
    </View>
  );
};

export default CreateProduct;
