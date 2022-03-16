import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
//import store from './slices/index.jsx';

export default () => {
  return (
      <Provider>
        <App />
      </Provider>
  );
};
