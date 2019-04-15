const path = require('path');
const src = path.resolve(__dirname, '../public/src');
const css = path.resolve(__dirname, '../public/css');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
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
	],
});