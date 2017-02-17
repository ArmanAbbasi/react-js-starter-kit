/**
 * Separating this from the main server file, allows us to do full es6+ from as low level as possible.
 * */
require('babel-core/register')({
    presets: [
        'es2015',
        'react'
    ],
    ignore: [
        /node_modules/
    ]
});
require.extensions['.scss'] = () => {
    return undefined;
};
require('./server');