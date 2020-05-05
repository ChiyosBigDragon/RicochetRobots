const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		'public/camel-develop/src/script/Client': './src/camel/Client.ts',
		'public/camel/controller/src/script/Controller': './src/Controller.ts',
		'public/robot-develop/src/script/Client': './src/robot/Client.ts'
	},
	target: 'node',
	output: {
		path: __dirname,
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: [
			'.ts',
			'.js',
			'json'
		],
	},
	externals: {
		firebase: 'firebase',
		'firebase-functions': 'firebase-functions',
		'firebase-admin': 'firebase-admin',
		numeral: 'numeral',
		acgraph: 'acgraph'
	}
};