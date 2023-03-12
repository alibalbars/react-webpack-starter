const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = "development";

module.exports = {
	mode: env,
	entry: "./src/index.jsx",
	module: {
		rules: [
			{
				test: /\.m?[jt]sx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: "swc-loader",
				},
			},
			{
				test: /\.s?[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		compress: true,
		port: 9000,
		hot: true,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "my react app",
			template: "./public/index.html",
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(env),
			},
		}),
		new MiniCssExtractPlugin(),
	],
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
};
