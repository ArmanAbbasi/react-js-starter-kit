require('babel-core/register')({
    presets: [
        'stage-0',
        'es2015',
        'react'
    ],
    ignore: /node_modules/
});
require('./server');