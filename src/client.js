import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './router/index';

ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}