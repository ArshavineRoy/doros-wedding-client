import React from 'react';
import ReactDOM from 'react-dom'; // Correct import
import { Provider } from 'react-redux';
import App from '../App';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
