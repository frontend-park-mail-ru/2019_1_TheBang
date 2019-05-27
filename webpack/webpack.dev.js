const path = require('path');
const src = path.resolve(__dirname, '../public/src');
const css = path.resolve(__dirname, '../public/css');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {

	return merge(common, {
		mode: 'development',
		devtool: 'eval-source-map',

		output: {
			filename: 'bundle.js'
		},

		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader',
							{
								loader: 'sass-loader',
								options: {
									includePaths: [src],
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
			]
		},

		plugins: [
			new ExtractTextPlugin('bundle.css'),

			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(env.NODE_ENV),
					'PORT_BASE': JSON.stringify(8001),
					'PORT_GAME': JSON.stringify(8002),
					'PORT_CHAT': JSON.stringify(8003),
				}
			}),
		],
	})
};