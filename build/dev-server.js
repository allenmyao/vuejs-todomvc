/* eslint-disable no-process-env, no-console */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');
const devServerConfig = require('./dev-server.conf');

var compiler = webpack(webpackConfig);

compiler.plugin('done', (stats) => {
  console.log('[webpack] Build successful!');
});

var devServer = new WebpackDevServer(compiler, {
  hot: true,
  quiet: false,
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
});

devServer.listen(devServerConfig.SERVER_PORT, devServerConfig.SERVER_HOST, (err) => {
  if (err) {
    throw err;
  }
  console.log('[webpack-dev-server] http://' + devServerConfig.SERVER_HOST + ':' + devServerConfig.SERVER_PORT + '/webpack-dev-server/index.html');
});

module.exports = devServer;
