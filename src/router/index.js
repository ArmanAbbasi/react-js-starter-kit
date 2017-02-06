import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from '../App';

let Factory = React.createFactory(App);

/**
 * Registering our routes
 * */
const Routes = (app) => {
    app.get('/', (req,res) => {
        let reactHtml = ReactDOMServer.renderToString(Factory({}));
        res.render('index.ejs', { reactOutput: reactHtml });
    });
};

export default Routes;