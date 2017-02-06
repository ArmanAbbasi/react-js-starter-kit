let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'App.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    resolve: {
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['react-hot-loader', 'babel-loader'],
            exclude: /node_modules/
        }]
    }
};