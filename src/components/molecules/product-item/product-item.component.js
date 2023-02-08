import React from 'react';
import {View, Text} from 'react-native';
import styles from './product-item.style.js';

const ProductItem = ({label = ''}) => {
  return (
    <View style={styles.container}>
      <Text>ProductItem</Text>
    </View>
  );
};

export default ProductItem;
