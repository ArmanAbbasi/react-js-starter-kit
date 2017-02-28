import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from '../router';

ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('app')
);

if(module.hot) {
    module.hot.accept(
        <Router routes={routes} history={browserHistory}/>,
        document.getElementById('app')
    );
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}