import React from 'react';
// here we bring react dom
import ReactDOM from 'react-dom';
// we reset css and _base file and bring it before index.css
import './_base.css'
import './index.css';
// import App.js
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
