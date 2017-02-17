import React from 'react';
import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';
import staticAsset from 'static-asset';
import zLib from 'zlib';
import handlebars  from 'express-handlebars';
import nodeJsx from 'node-jsx';
import ReactDOMServer from 'react-dom/server';
import morgan from 'morgan';
import { match, RouterContext } from 'react-router';

import routes from '../router';

const ONE_YEAR_IN_MILLIS = 31557600000;
const APP_PORT_NUM = process.env.PORT || 3000;

const app = express();

/**
 * Setting up the logger
 * */
const accessLogStream = fs.createWriteStream((() => {
    try {
        fs.mkdirSync(path.join(__dirname, '../logs/'));
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }

    return path.join(__dirname, `../logs/access_${(new Date()).toISOString()}.log`);
})(), { flags: 'a' });

app.use(morgan('combined', {
    stream: accessLogStream
}));

/**
 * Transpile Jsx from node.
 * */
nodeJsx.install();

/**
 * Gzip compression
 * */
app.use(compression({
    threshold: 0,
    level: zLib.Z_BEST_COMPRESSION
}));

/**
 * Indicating our static folder and setting caching duration
 * */
app.use('/dist', staticAsset(path.resolve(__dirname, '../../dist/'), { maxAge: ONE_YEAR_IN_MILLIS }));
app.use('/dist', express.static(path.resolve(__dirname, '../../dist/'), { maxAge: ONE_YEAR_IN_MILLIS }));
app.use('/service-worker.js', express.static(path.resolve(__dirname, '../../dist/service-worker.js')));

/**
 * Removing the baked in header field
 * */
app.disable('x-powered-by');

/**
 * Making it easier for our app to find the views
 * */
app.set('views', path.resolve(__dirname, '../views/layout/'));

/**
 * View engine
 * */
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname:'.hbs',
    partialsDir: path.resolve(__dirname, '../views/layout/partials')
}));

/**
 * Direct all paths to react-router and match the URLs.
 * */
app.get('*', (req, res) => {
    match({ routes: routes, location: req.url }, (err, redirect, props) => {
        let reactHtml = ReactDOMServer.renderToString(<RouterContext {...props}/>);
        res.render('index', { reactOutput: reactHtml });
    });
});

/**
 * Handling error 500.
 * */
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/**
 * Run app at port
 * */
app.listen(APP_PORT_NUM, () => console.log(`Server running at http://localhost:${APP_PORT_NUM}`));