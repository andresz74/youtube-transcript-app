import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'; // Import your Redux store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your app with Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
