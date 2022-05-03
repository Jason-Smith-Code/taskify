import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './app/App'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './app/store';
import {
  BrowserRouter
} from "react-router-dom";

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store} >
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();