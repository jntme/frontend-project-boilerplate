const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    index: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname + "/dist"),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          "file-loader?name=images/[name].[ext]",
          "image-webpack-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Index Page",
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      },
      hash: true,
      excludeChunks: ['contact'],
      favicon: './src/favicon.ico'
    }),
    new HtmlWebpackPlugin({
      title: "Contact Page",
      template: './src/contact.html',
      chunks: ['contact'],
      minify: {
        collapseWhitespace: isProd
      },
      filename: 'contact.html',
      hash: true
    }),
    new ExtractTextPlugin('style.css'),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    compress: true,
    port: 9000,
    stats: "errors-only"
  }
}