// Libraries
require('../postcss.config')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/'

// Files
const utils = require('./utils')

// Configuration
module.exports = (env) => {

  // Get default mode from env
  const MODE = env.mode || 'production';

  return {
    mode: MODE,
    target: 'web',
    devtool: 'eval-source-map',
    context: path.join(__dirname, '../src'),
    entry: {
      app: path.join(__dirname, '../src/app.js'),
    },
    output: {
      publicPath: ASSET_PATH,
      path: path.join(__dirname, '../dist'),
      filename: 'assets/js/[name].[contenthash:7].bundle.js'
    },
    devServer: {
      static: path.join(__dirname, '../src'),
      compress: true,
      open: true
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        source: path.join(__dirname, '../src'), // Relative path of src
        images: path.join(__dirname, '../src/assets/images'), // Relative path of images
        fonts: path.join(__dirname, '../src/assets/fonts'), // Relative path of fonts
      }
    },

    /*
      Loaders with configurations
    */
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            utils.isDevMode(MODE) ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader'
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[contenthash:7][ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[contenthash:7][ext]'
          }
        },
        /*{
          test: /\.(mp4)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/videos/[name].[contenthash:7][ext]'
          },
        }*/
      ]
    },
    experiments: {
      topLevelAwait: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            filename: 'assets/js/vendor.[chunkhash:7].bundle.js',
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /node_modules/
          }
        }
      }
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: '../src/assets/images', to: 'images' },
          { from: '../manifest.json', to: 'manifest.json' },
          { from: '../browserconfig.xml', to: 'browserconfig.xml' },
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[chunkhash:7].bundle.css',
        chunkFilename: '[id].css',
      }),

      /*
        Pages
      */

      // Homepage
      new HtmlWebpackPlugin({
        minify: !utils.isDevMode(MODE),
        filename: 'index.html',
        template: 'views/index.pug',
        inject: 'body',
      }),

      // Other pages
      ...utils.pages(MODE), // mode
      ...utils.pages(MODE, 'blog'), // mode, folder name under pages

      new WebpackNotifierPlugin({
        title: 'Your project'
      }),
    ],
  }
}
