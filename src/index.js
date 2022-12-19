import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ClearBrowserCacheBoundary } from 'react-clear-browser-cache';


import { Provider } from 'react-redux';
import { store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import axios from "axios";

let persistor = persistStore(store);
//const TopRightAlertContext = createContext()

//axios.defaults.baseURL = "http://localhost:5001/api/v1/";   
axios.defaults.baseURL = "https://iot.cwsbuild.com/api/v1/";   // live 
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClearBrowserCacheBoundary auto={true}  duration={60000}>
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
  </React.StrictMode>
  </ClearBrowserCacheBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();