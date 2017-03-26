const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry : {
		'main' : [
			'./components/Global/Global.jsx'
		]
	},
	output : {
		path: __dirname,
		filename: 'js/[name].js'
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/, 
			loader: 'babel-loader', 
			query: {
				presets:['react']
			}
		}, {
			test: /\.scss$/,
			use: [{
				loader: "style-loader" // creates style nodes from JS strings
			}, {
				loader: "css-loader" // translates CSS into CommonJS
			}, {
				loader: "sass-loader" // compiles Sass to CSS
			}]
		}]
	},

	plugins: [
		extractSass,
		new webpack.ProvidePlugin({
			'Uno': path.resolve(__dirname, './js/controller.js')
		})
	]
};