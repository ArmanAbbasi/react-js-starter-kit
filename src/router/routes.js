import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from '../views/HomePage';
import Listing from '../views/Listing';

export default (
    <Route path="/" component={HomePage}>
        <IndexRoute component={HomePage}/>
        <Route path="/listing" component={Listing}/>
    </Route>
);