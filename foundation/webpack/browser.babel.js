import Webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const SRC_PATH = path.resolve (__dirname, '../../src');
const BUILD_PATH = path.resolve (__dirname, '../../build');
const STATIC_PATH = '/';

export default {

	entry: `${SRC_PATH}/browser/index.js`,

	output: {
		path: BUILD_PATH,
		filename: 'bundle.js',
		publicPath: STATIC_PATH
	},

	devServer: {
		contentBase: BUILD_PATH,
		compress: true,
		historyApiFallback: {
 			index: STATIC_PATH
		},
    	inline: true,
		// https: true,
		port: 8080
	},

	devtool: 'source-map',

	plugins: [
		new CopyWebpackPlugin ([{
			from: 'src/html'
		}]),
		new Webpack.DllReferencePlugin ({
	      	context: __dirname,
			manifest: require (`${SRC_PATH}/vendor/vendor-manifest.json`)
		}),
		new Webpack.HotModuleReplacementPlugin,
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
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract (['css'])
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