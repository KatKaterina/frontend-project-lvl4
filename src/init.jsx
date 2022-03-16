import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';

export default async () => {
  console.log('!');
  return (
    <div id="test">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
};
