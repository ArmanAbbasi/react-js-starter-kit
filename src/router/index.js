import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from '../App';

//let Factory = React.createFactory(App);

/**
 * Registering our routes
 * */
const Routes = (app) => {
    app.get('/', (req,res) => {
        let reactHtml = ReactDOMServer.renderToString(<App/>);
        res.render('index', { reactOutput: reactHtml });
    });

    app.get('/listing', (req,res) => {
        let reactHtml = ReactDOMServer.renderToString(<App/>);
        res.render('listing', { reactOutput: reactHtml });
    });
};

export default Routes;