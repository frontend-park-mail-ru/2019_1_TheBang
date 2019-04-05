const path = require('path');
const src = path.resolve(__dirname, '../public/src');
const css = path.resolve(__dirname, '../public/css');
const build = path.resolve(__dirname, '../dist');
const HtmlWebpackPlugin = require ('html-webpack-plugin');


module.exports = {
	entry: path.resolve(src, 'app.js'),
	output: {
		path: build,
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
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},

			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|webp)$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: '[name][hash].[ext]'
				},
			},

			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options:{
					root: src,
					basedir: '/',
					pretty: true
				}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.pug',
		}),
	],
	resolve: {
		alias: {
			src: src,
			css: css,
		}
	}
};