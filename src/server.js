require('babel-core/register')({
    presets: [
        'stage-0',
        'es2015',
        'react'
    ],
    ignore: /node_modules/
});
require('./router');

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const compression = require('compression');
const staticAsset = require('static-asset');
const zLib = require('zlib');

const ONE_YEAR_IN_MILLIS = 31557600000;
const APP_PORT_NUM = process.env.PORT || 3000;

const DISTRIBUTION_FOLDER = 'dist';

require('node-jsx').install();

/**
 * Indicating our static folder and setting caching duration
 * */
app.use(`/${DISTRIBUTION_FOLDER}`, staticAsset(path.resolve(__dirname) + '/dist/', { maxAge: ONE_YEAR_IN_MILLIS }));
app.use(`/${DISTRIBUTION_FOLDER}`, express.static(path.resolve(__dirname) + '/dist/', { maxAge: ONE_YEAR_IN_MILLIS }));
app.use('/service-worker.js', express.static((`./${DISTRIBUTION_FOLDER}/service-worker.js`)));

/**
 * Making it easier for our app to find the views
 * */
app.set('views', __dirname + '/views');

/**
 * View engine
 * */
app.set('view engine', 'ejs');

/**
 * Routes
 * */
console.log(require('./router').default);
require('./router').default(app);

/**
 * Gzip compression is a must
 * */
app.use(compression({
    threshold: 0,
    level: zLib.Z_BEST_COMPRESSION
}));


/**
 * Do following with all incoming GET requests
 * */
app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
});

/**
 * Run app at port
 * */
app.listen(APP_PORT_NUM, () => {
    console.log(`Server started at http://localhost:${APP_PORT_NUM}`);
});