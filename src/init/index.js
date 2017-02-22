/**
 * Separating this from the main server file, allows us to do full es6+ from as low level as possible.
 * */
let fs = require('fs');
let path = require('path');
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../.babelrc')));

require('babel-core/register')(config);
require.extensions['.scss'] = () => {
    return undefined;
};
require('./server');