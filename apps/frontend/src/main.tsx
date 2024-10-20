import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './store/store.ts';
import App from './App.tsx';

import './index.scss';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}><RouterProvider router={App()} /> </PersistGate>
    </Provider>
  </React.StrictMode>,
);