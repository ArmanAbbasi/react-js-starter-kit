import path from 'path';
import express from 'express';
import compression from 'compression';
import staticAsset from 'static-asset';
import zLib from 'zlib';
import handlebars  from 'express-handlebars';
import nodeJsx from 'node-jsx';

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
    console.log(`Server ${process.env.NODE_ENV === 'production' ? 'started' : 'building'} at http://localhost:${APP_PORT_NUM}`);
});