import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// var routes = require('./routes').routes;
//
// var initialState = window.__INITIAL_STATE__;
// store = store.configureStore(initialState);

ReactDOM.render(
    <App client={this}/>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}