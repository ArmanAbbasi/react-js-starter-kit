/* globals view */
import React from 'react';
import ReactDOM from 'react-dom';

console.log(view);

import App from './app';


// var initialState = window.__INITIAL_STATE__;
// store = store.configureStore(initialState);

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}