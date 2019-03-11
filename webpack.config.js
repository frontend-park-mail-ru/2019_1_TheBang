const path = require('path');
const src = path.resolve(__dirname, 'public/src');
const build = path.resolve(__dirname, 'dist');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(src, 'app.js'),
    output: {
        path: build,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    // {
                        
                    //     loader: 'ttf-loader',
                    //     options: {
                    //         name: './font/[name].[ext]',
                    //     },
                    // },
                    {
                        loader: 'file-loader?name=./assets/fonts/webfonts/[name].[ext]'
                    },
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options:{
                    pretty: true
                }
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
            template: 'index.pug',
        })
    ]
};