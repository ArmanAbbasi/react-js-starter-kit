/**
 * Separating this from the main server file, allows us to do full es6+ from as low level as possible.
 * */
require('babel-core/register')({
    presets: [
        'stage-0',
        'es2015',
        'react'
    ],
    ignore: /node_modules/
});
require('./server');