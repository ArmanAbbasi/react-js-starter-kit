import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

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
        publicPath: '/dist/'
    },

    resolve: {
        modules: [
            'client',
            'common',
            'node_modules'
        ],
        alias: {
            'components': path.resolve(__dirname, '../components')
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        }]
    },

    plugins: [
        new CopyWebpackPlugin([{
            context: './src/',
            from: 'images/**/*'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HtmlWebpackPlugin({
            filename: '../src/views/layout/partials/embeds.hbs',
            template: 'src/views/layout/partials/embeds.template.html',
            inject: false,
            genFileText: '<!-- This is a generated file -->'
        })
    ],

    node: {
        fs: 'empty'
    }
};