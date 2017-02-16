import React from 'react';
import ReactDOMServer from 'react-dom/server';

import HomePage from '../views/HomePage';
import Listing from '../views/Listing';

/**
 * Registering our routes
 * */
const Routes = (app) => {
    app.get('/', (req,res) => {
        let reactHtml = ReactDOMServer.renderToString(<HomePage/>);
        res.render('index', { reactOutput: reactHtml, view: JSON.stringify(HomePage) });
    });

    app.get('/listing', (req,res) => {
        let reactHtml = ReactDOMServer.renderToString(<Listing/>);
        res.render('index', { reactOutput: reactHtml, view: './views/Listing' });
    });
};

export default Routes;