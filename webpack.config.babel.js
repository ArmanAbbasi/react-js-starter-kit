import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {
    entry: path.resolve(__dirname, 'src', 'App.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    resolve: {
    },

    module: {
        rules: [{
            test: /\.js?$/,
            loaders: [
                'react-hot-loader',
                'babel-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: [
                    'css-loader',
                    'sass-loader'
                ]
            }),
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './src/images/**/*',
            to: 'images',
            flatten: true
        }]),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        })
    ]
};