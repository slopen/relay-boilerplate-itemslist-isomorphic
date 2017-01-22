const Webpack = require ('webpack');
const path = require ('path');

const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const nodeExternals = require ('webpack-node-externals');

const SRC_PATH = path.resolve (__dirname, '../../src');
const BUILD_PATH = path.resolve (__dirname, '../../build/server');

module.exports = {

	entry: `${SRC_PATH}/server/index.js`,

	output: {
		path: BUILD_PATH,
		filename: 'index.js'
	},

	devServer: {
		progress: true,
		inline: true
	},

	target: 'node',

	externals: [
		nodeExternals ()
	],

	devtool: 'source-map',

	plugins: [
		new ExtractTextPlugin ('styles.css')
	],

	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: [
						'react',
						'es2015'
					],
					plugins: [
						'react-relay',
						'transform-decorators-legacy',
						'transform-class-properties'
					]
				}
			},
			{
				include: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|ico)(\?\S*)?$/,
				loader: 'url?limit=5000&name=[name].[ext]'
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract (['css', 'less'])
			}
		]
	},

	resolve: {
		root: [
			path.resolve ('./src'),
			path.resolve ('./src/components'),
			path.resolve ('./node_modules')
		]
	}
}