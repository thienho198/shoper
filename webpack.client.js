const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({
  keepInMemory: true,
  includeAllFileTypes: false,
  fileTypes: ['js', 'css'],
});

const config = {
  mode: 'development',
  // Tell webpack to root file of our server app
  entry: './src/client/client.js',

  // Tell webpack where to put output file
  output: {
    filename: 'bundle_[hash].js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'inline-source-map',
  plugins: [assetsPluginInstance],
};

module.exports = merge(baseConfig, config);
