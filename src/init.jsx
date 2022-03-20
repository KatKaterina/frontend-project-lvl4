import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';
import { io } from "socket.io-client";

export default async (socketClient = io()) => {
  socketClient.on('newMessge', (message) => {
    store.dispatch(addMessage({ message }));
  });

  return (
    <div id="test">
      <Provider store={store}>
        <App socket={socketClient}/>
      </Provider>
    </div>
  );
};
