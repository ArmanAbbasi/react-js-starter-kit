import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import  HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: {
        client: path.resolve(__dirname, '../init/', 'client.js'),
        main: path.resolve(__dirname, '../stylesheets', 'global.scss'),
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ]
    },

    output: {
        path: path.resolve(__dirname, '../../dist'),
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
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: path.resolve(__dirname, './')
                    }
                }, {
                    loader: 'sass-loader'
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
            filename: '../src/views/layout/partials/embeds.hbs',
            template: 'src/views/layout/partials/embeds.template.html',
            inject: false,
            genFileText: '<!-- This is a generated file -->'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    devtool: 'source-map'
};