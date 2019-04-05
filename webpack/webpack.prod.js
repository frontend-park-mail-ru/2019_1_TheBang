const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].bundle.[chunkhash].js',
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
	],

	optimization: {
		runtimeChunk: true,
	}
});