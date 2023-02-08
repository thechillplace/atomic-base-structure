import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './about.style.js';
import PubSub from 'pubsub-js';
import PUBSUB_EVENT from '../../pubsub/event-type';

const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>About</Text>
      <TouchableOpacity
        onPress={() => {
          PubSub.publish(PUBSUB_EVENT.TEST, 'hello worldssss!');
          navigation.goBack();
        }}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;
