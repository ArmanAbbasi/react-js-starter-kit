import React from 'react';
import {IndexRoute, Route} from 'react-router';

import HomePage from '../views/HomePage';
import Listing from '../views/Listing';
//import NotFound from '../views/NotFound';

export default (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>

            {/*{ /* Routes requiring login */ }*/}
            {/*<Route onEnter={requireLogin}>*/}
                {/*<Route path="chat" component={Chat}/>*/}
                {/*<Route path="loginSuccess" component={LoginSuccess}/>*/}
            {/*</Route>*/}

            { /* Routes */ }
            <Route path="listing" component={Listing}/>

            { /* Catch all route */ }
            {/*<Route path="*" component={NotFound} status={404} />*/}
        </Route>
    );
};