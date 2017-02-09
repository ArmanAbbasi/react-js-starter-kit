import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {
    entry: {
        app: path.resolve(__dirname, 'src', 'App.js'),
        vendor: [
            'react'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },

    resolve: {
        extensions: ['.js', '.scss', '.css']
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
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ],
                fallback: 'style-loader'
            })
        }]
    },

    plugins: [
        new CopyWebpackPlugin([{
            from: './src/images/**/*',
            to: 'images',
            flatten: true
        }]),
        new ExtractTextPlugin({ filename: '[name].[chunkhash].css' }),
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
        })
    ],

    devtool: 'source-map'
};