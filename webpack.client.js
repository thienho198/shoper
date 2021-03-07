const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

// const AssetsPlugin = require('assets-webpack-plugin');
// const assetsPluginInstance = new AssetsPlugin({
//   keepInMemory: true,
//   includeAllFileTypes: false,
//   fileTypes: ['js', 'css'],
// });

const config = {
  mode: 'development',
  // Tell webpack to root file of our server app
  entry: './src/client/client.js',
  optimization: {
    nodeEnv: 'development',
    splitChunks: {
      automaticNameDelimiter:'/',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: false,
        },
      },
    },
  },
  // Tell webpack where to put output file
  output: {
    filename: 'bundle_[hash].js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'inline-source-map',
  plugins: [
     new ReactLoadableSSRAddon({
      filename: 'react-loadable-ssr-addon.json',
  }
  )]
};

module.exports = merge(baseConfig, config);
