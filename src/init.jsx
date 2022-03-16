import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
//import store from './slices/index.jsx';

export default () => {
console.log('!');
  return (
      <div id="test">
      <Provider>
        <App />
      </Provider>
    </div>
  );
};
