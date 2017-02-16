import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import HomePage from '../views/HomePage';
import Listing from '../views/Listing';
import NotFound from '../views/NotFound';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/listing" component={Listing}/>
        <Route path="*" component={NotFound}/>
    </Router>
);