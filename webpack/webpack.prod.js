const path = require('path');
const src = path.resolve(__dirname, '../public/src');
const css = path.resolve(__dirname, '../public/css');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = env => {

	return merge(common, {
		mode: 'production',
		output: {
			filename: '[name].bundle.[chunkhash].js',
		},

		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'eslint-loader',
				},
				{
					test: /\.(jpg|png|gif|svg|webp)$/,
					loader: 'image-webpack-loader',
					enforce: 'pre',
					options: {
						bypassOnDebug: true, // webpack@1.x
						disable: true, // webpack@2.x and newer
					}
				},

				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader',
							{
								loader: 'sass-loader',
								options: {
									includePaths: [src],
									minimize: true
								}
							},
							{
								loader: 'sass-resources-loader',
								options: {
									resources: path.resolve(css, 'variable.scss'),
								}

							}]
					})
				},
			],
		},

		plugins: [
			new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),

			new ExtractTextPlugin('[name].bundle.[chunkhash].css'),

			new UglifyJSPlugin({
				sourceMap: true,
				uglifyOptions: {
					beautify: false,
					ecma: 8,
					compress: true,
					comments: false
				}
			}),

			new webpack.LoaderOptionsPlugin({
				minimize: true,
			}),

			new WorkboxPlugin.GenerateSW({
				clientsClaim: true,
				skipWaiting: true,

			}),

			new webpack.DefinePlugin({
				'process.env':{
					'NODE_ENV': JSON.stringify(env.NODE_ENV),
					'PORT_BASE': JSON.stringify(8001),
					'PORT_GAME': JSON.stringify(8002),
					'PORT_CHAT': JSON.stringify(8003),
				}
			}),
		],

		optimization: {
			runtimeChunk: true,
		}
	})
};