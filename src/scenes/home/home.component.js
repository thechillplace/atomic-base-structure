import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './home.style.js';
import {useSocket} from '../../services/websocket';

const Home = () => {
  const {sendMessage, lastMessage, connectionStatus, messageHistory} =
    useSocket();

  console.log('connectionStatus', connectionStatus);
  console.log('lastMessage', lastMessage);
  console.log('messageHistory', messageHistory);

  return (
    <View style={styles.container}>
      <Text>{connectionStatus}</Text>
      <Text>{lastMessage?.data}</Text>
      <TouchableOpacity onPress={() => sendMessage('Ngo Dang Truong1')}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
