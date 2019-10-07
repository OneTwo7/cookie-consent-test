const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const extractCSS = new MiniCssExtractPlugin({
	filename: isProduction ? '[name].[contenthash].css' : '[name].css',
	chunkFilename: '[id].css',
});

const stylelintPlugin = new StyleLintPlugin();

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		filename: isProduction ? 'main.[hash].js' : 'main.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},
	optimization: {
		minimize: isProduction,
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: false,
		port: 3030,
		watchContentBase: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'eslint-loader',
				],
			},
			{
				test: /\.(s*)css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'media/',
				},
			},
			{
				test: /\.(woff(2)?|ttf|otf|eot|svg|json)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'media/',
					},
				}],
			},
		],
	},
	plugins: [
		extractCSS,
		stylelintPlugin,
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
		}),
	],
	watch: !isProduction,
};
