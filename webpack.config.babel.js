import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import  HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: {
        app: path.resolve(__dirname, 'src', 'App.js'),
        main: path.resolve(__dirname, 'src/stylesheets', 'global.scss'),
        vendor: [
            'react'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: `[name].${process.env.NODE_ENV === 'production' ? '[chunkhash].' : ''}js`
    },

    resolve: {
        extensions: ['.js', '.css', '.scss'],
        modules: [
            'client',
            'common',
            'node_modules'
        ]
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'react-hot-loader',
                'babel-loader'
            ]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: false
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false
                    }
                }]
            })
        }]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: `[name].${process.env.NODE_ENV === 'production' ? '[chunkhash].' : ''}css`
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HtmlWebpackPlugin({
            filename: '../src/views/partials/embeds.hbs',
            template: 'src/views/partials/embeds.template.html',
            inject: false,
            genFileText: '<!-- This is a generated file -->'
        })
    ],

    devtool: 'source-map'
};