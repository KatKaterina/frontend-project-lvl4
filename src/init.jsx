import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';
import { io } from "socket.io-client";
import { addMessage } from './slices/messagesSlice.js';
import { addChannel } from './slices/ChannelsSlice.js';

export default async (socketClient = io()) => {
//export default async () => {
  socketClient.on('newMessge', (message) => {
    store.dispatch(addMessage({ message }));
  });
  socketClient.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });
  socketClient.on('renameChannel', (channel) => {
    const { id, name } = channel;
    store.dispatch(renameChannel({ id, name }));
  });

  return (
      <Provider store={store}>
        <App socket={socketClient}/>
      </Provider>
  );
};

//<App socket={socketClient}/>