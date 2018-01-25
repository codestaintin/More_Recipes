const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'client/src'),
  build: path.join(__dirname, 'production'),
};
const common = {
  context: PATHS.app,
  entry: {
    app: './index.jsx'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_HOST: JSON.stringify('https://mrecipes.herokuapp.com/'),
        DEFAULT_IMAGE: JSON.stringify(process.env.DEFAULT_IMAGE),
        NO_IMAGE: JSON.stringify(process.env.NO_IMAGE),
        CLOUDINARY_URL: JSON.stringify(process.env.CLOUDINARY_URL),
        CLOUDINARY_UPLOAD_PRESET: JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET)
      }
    })
  ],
  devtool: 'none',
  module: {
    loaders: [
      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATHS.app
      },
      {
        test: /\.(scss|css)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      },
      {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  }
};
module.exports = common;

