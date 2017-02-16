import path from 'path';
import express from 'express';
import compression from 'compression';
import staticAsset from 'static-asset';
import zLib from 'zlib';
import handlebars  from 'express-handlebars';
import nodeJsx from 'node-jsx';
import Router from '../router';

const ONE_YEAR_IN_MILLIS = 31557600000;
const APP_PORT_NUM = process.env.PORT || 3000;
const DISTRIBUTION_FOLDER = 'dist';

const app = express();

nodeJsx.install();

/**
 * Indicating our static folder and setting caching duration
 * */
app.use(`/${DISTRIBUTION_FOLDER}`, staticAsset(path.resolve(__dirname, '../../dist/'), { maxAge: ONE_YEAR_IN_MILLIS }));
app.use(`/${DISTRIBUTION_FOLDER}`, express.static(path.resolve(__dirname, '../../dist/'), { maxAge: ONE_YEAR_IN_MILLIS }));
app.use('/service-worker.js', express.static((`./${DISTRIBUTION_FOLDER}/service-worker.js`)));

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
app.set('view engine', '.hbs');
app.engine('.hbs', handlebars({
    extname:'.hbs',
    defaultLayout: 'main',
    partialsDir: path.resolve(__dirname, '../views/layout/partials'),
    layoutsDir: path.resolve(__dirname, '../views/layout/')
}));

/**
 * Use the routes
 * */
Router(app);

/**
 * Gzip compression
 * */
app.use(compression({
    threshold: 0,
    level: zLib.Z_BEST_COMPRESSION
}));

/**
 * Run app at port
 * */
app.listen(APP_PORT_NUM, () => console.log(`Server running at http://localhost:${APP_PORT_NUM}`));