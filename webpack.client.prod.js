const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({
  keepInMemory: true,
  includeAllFileTypes: false,
  fileTypes: ['js', 'css'],
});

const baseConfig = require('./webpack.base');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  // optimization: {
  //   minimizer: [
  //     // we specify a custom UglifyJsPlugin here to get source maps in production
  //     new UglifyJSPlugin({ exclude: /\/node_modules/ }),
  //   ],
  // },
  // Tell webpack to root file of our server app
  entry: './src/client/client.js',

  // Tell webpack where to put output file
  output: {
    filename: 'bundle_[hash].js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new BundleAnalyzerPlugin(),

    new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LodashModuleReplacementPlugin(),
    assetsPluginInstance,
  ],
};

module.exports = merge(baseConfig, config);
