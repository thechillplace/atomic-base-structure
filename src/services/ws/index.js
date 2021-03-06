import {useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';

function useSocket() {
  const {sendMessage, lastMessage, readyState} = useWebSocket(
    'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self',
    {
      onOpen: () => console.log('opened'),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: closeEvent => true,
      share: true,
      reconnectInterval: 1000,
      reconnectAttempts: 100,
    },
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);
  return {
    sendMessage,
    lastMessage,
    connectionStatus,
    messageHistory,
  };
}

export {useSocket};
