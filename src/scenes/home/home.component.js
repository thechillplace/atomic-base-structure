import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './home.style.js';
import {useSocket} from '../../services/websocket';
import PubSub from 'pubsub-js';
import PUBSUB_EVENT from '../../pubsub/event-type';

const Home = ({navigation}) => {
  const {sendMessage, lastMessage, connectionStatus, messageHistory} =
    useSocket();

  console.log('connectionStatus', connectionStatus);
  console.log('lastMessage', lastMessage);
  console.log('messageHistory', messageHistory);

  useEffect(() => {
    const testPubSub = PubSub.subscribe(PUBSUB_EVENT.TEST, _testSubscriber);
    return () => {
      PubSub.unsubscribe(testPubSub);
    };
  }, []);

  const _testSubscriber = (msg, data) => {
    sendMessage(data);
  };

  return (
    <View style={styles.container}>
      <Text>{connectionStatus}</Text>
      <Text>{lastMessage?.data}</Text>
      <TouchableOpacity
        onPress={() => {
          // PubSub.publish(PUBSUB_EVENT.TEST, 'hello world!');
          navigation.navigate('About');
        }}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
