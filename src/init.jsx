import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';
import { io } from 'socket.io-client';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from './slices/ChannelsSlice.js';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import { toast } from 'react-toastify';

export default async (socketClient = io()) => {

  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

  socketClient.on('newMessage', (message) => {
    store.dispatch(addMessage({ message }));
  });
  socketClient.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });
  socketClient.on('renameChannel', (channel) => {
    const { id, name, removable } = channel;
    console.log('init ' + name);
    //store.dispatch(renameChannel({ id, changes: { name, removable }, }));
    store.dispatch(renameChannel({ id, name, removable }));
  });
  socketClient.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel({ id }));
  });

  return (
    <Provider store={store}>
      <App socket={socketClient}/>
    </Provider>
  );
};
