import path from 'path';
import express from 'express';
import compression from 'compression';
import staticAsset from 'static-asset';
import zLib from 'zlib';
import handlebars  from 'express-handlebars';
import nodeJsx from 'node-jsx';

import React from 'react';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';

const ONE_YEAR_IN_MILLIS = 31557600000;
const APP_PORT_NUM = process.env.PORT || 3000;
const DISTRIBUTION_FOLDER = 'dist';

const app = express();

nodeJsx.install();

/**
 * Indicating our static folder and setting caching duration
 * */
app.use(`/${DISTRIBUTION_FOLDER}`, staticAsset(path.resolve(__dirname, '../dist/'), { maxAge: ONE_YEAR_IN_MILLIS }));
app.use(`/${DISTRIBUTION_FOLDER}`, express.static(path.resolve(__dirname, '../dist/'), { maxAge: ONE_YEAR_IN_MILLIS }));
app.use('/service-worker.js', express.static((`./${DISTRIBUTION_FOLDER}/service-worker.js`)));

/**
 * Removing the baked in header field
 * */
app.disable('x-powered-by');

/**
 * Making it easier for our app to find the views
 * */
app.set('views', __dirname + '/views/layout/');

/**
 * View engine
 * */
app.engine('.hbs', handlebars({
    extname:'.hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/layout/partials',
    layoutsDir: __dirname + '/views/layout'
}));
app.set('view engine', '.hbs');

/**
 * Routes
 * */
//require('./router').default(app);
//require('./file').default(app);
app.use((req, res) => require('./../file').default);

/**
 * Gzip compression is a must
 * */
app.use(compression({
    threshold: 0,
    level: zLib.Z_BEST_COMPRESSION
}));

const renderFullPage = (html, initialState) => {
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Full Stack Web Developer based in London</title>
        <link rel="stylesheet" type="text/css" href="/static/app.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
};

/**
 * Do following with all incoming GET requests
 * */
// app.get('*', (req, res) => {
//     res.setHeader('Content-Type', 'text/javascript');
// });
app.get('/*', function (req, res) {
    const location = createLocation(req.url);

    match({ routes, location }, (err, redirectLocation, renderProps) => {

        if(err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }

        if(!renderProps)
            return res.status(404).end('Not found');

        const store = configureStore();

        const InitialView = (
            <Provider store={store}>
                {() =>
                    <RoutingContext {...renderProps} />
                }
            </Provider>
        );

        //This method waits for all render component promises to resolve before returning to browser
        fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
            .then(html => {
                const componentHTML = React.renderToString(InitialView);
                const initialState = store.getState();
                res.status(200).end(renderFullPage(componentHTML,initialState));
            })
            .catch(err => {
                console.log(err);
                res.end(renderFullPage('',{}));
            });

    });
});

/**
 * Run app at port
 * */
app.listen(APP_PORT_NUM, () => console.log(`Server running at http://localhost:${APP_PORT_NUM}`));