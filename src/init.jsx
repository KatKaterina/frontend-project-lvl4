import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';
import { io } from "socket.io-client";
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from './slices/ChannelsSlice.js';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

export default async (socketClient = io()) => {

  const i18nInstance = i18n.createInstance();

    await i18nInstance
      .use(initReactI18next)
      .init({
        lng: 'ru',
        resources,
      });
 

  socketClient.on('newMessge', (message) => {
    store.dispatch(addMessage({ message }));
  });
  socketClient.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });
  socketClient.on('renameChannel', (channel) => {
    console.log("init/ channel");
    console.log(channel);
    const { id, name } = channel;
    store.dispatch(renameChannel({ id, changes: { name }, }));
  });
  socketClient.on('removeChannel', ({ id }) => {
    console.log("init/ id");
    console.log(id);
    store.dispatch(removeChannel({ id }));
  });

  return (
      <Provider store={store}>
        <App socket={socketClient}/>
      </Provider>
  );
};

//<App socket={socketClient}/>