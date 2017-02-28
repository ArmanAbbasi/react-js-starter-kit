import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageMinPlugin from 'imagemin-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

let config = {
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
        filename: `[name].${isProduction ? '[hash].' : ''}js`
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
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: isProduction
                    }
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
        new CopyWebpackPlugin([{
            context: './src/',
            from: 'images/**/*'
        }]),
        new ExtractTextPlugin({
            filename: `[name].${isProduction ? '[hash].' : ''}css`
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
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new ImageMinPlugin({
            disable: !isProduction,
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    node: {
        fs: 'empty'
    },

    devtool: isProduction ? 'cheap-source-map' : 'cheap-module-eval-source-map'
};

if (!isProduction) {
    config.entry.hotReload = 'webpack-hot-middleware/client';
}

if (isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
            warnings: false
        }
    }));
}

export default config;