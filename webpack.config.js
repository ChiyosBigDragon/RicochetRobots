const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		'public/camel/src/script/Client': './src/Client.ts',
		'public/camel/controller/src/script/Controller': './src/Controller.ts',
	},
	output: {
		path: __dirname,
		filename: '[name].main.js',
	},
	// entry: './src/main.ts',
	// output: {
	// 	filename: 'main.js',
	// 	path: path.join(__dirname, 'public/camel/src/script')
	// },
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
			'.ts'
		]
	},
	externals: {
		firebase: 'firebase',
		numeral: 'numeral'
	}
};