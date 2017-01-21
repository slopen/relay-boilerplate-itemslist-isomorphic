import Webpack from 'webpack';
import path from 'path';


const BUILD_PATH = path.resolve (__dirname, '../../build');
const SRC_PATH = path.resolve (__dirname, '../../src/vendor');

export default {

	entry: {
		vendor: [
			SRC_PATH
		]
	},

	output: {
		path: BUILD_PATH,
		filename: '[name].js',
		library: '[name]'
	},

	plugins: [
		new Webpack.DllPlugin ({
			path: `${SRC_PATH}/[name]-manifest.json`,
			name: '[name]',
			context: SRC_PATH
		})
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
			}
		]
	},

	resolve: {
		root: SRC_PATH,
		modulesDirectories: [
			'node_modules'
		]
	}
}