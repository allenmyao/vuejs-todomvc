const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf');
const devServerConfig = require('./dev-server.conf');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [
    'webpack-dev-server/client?http://' + devServerConfig.SERVER_HOST + ':' + devServerConfig.SERVER_PORT,
    'webpack/hot/dev-server'
  ].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  debug: true,
  devtool: '#eval-source-map',
  vue: {
    // use custom postcss plugins
    postcss: [ require('postcss-cssnext')(), require('precss')() ],
    // disable vue-loader autoprefixing.
    // this is a good idea since cssnext comes with it too.
    autoprefixer: false
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});
