var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './lib/index.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEVTOOLS__': false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'Scout JS',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets/images/favicon.ico')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!cssnext-loader') },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style!css!autoprefixer!sass' },
      { test: /\.png$/,  loader: 'url-loader?mimetype=image/png'  },
      { test: /\.json$/,  loader: 'json-loader'  },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: 'file-loader' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  },
  cssnext: {
    browsers: 'last 2 versions'
  }
};