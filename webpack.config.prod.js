const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const cssnano = require('cssnano');

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: ['./client/index.js'],
    vendor: ['react', 'react-dom'],
  },

  output: {
    path: `${__dirname}/dist/client/`,
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules'],
  },

  module: {
    unknownContextCritical: false,
    unknownContextRegExp: /^.\/.*$/,
    rules: [
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[hash:base64]',
                modules: true,
                importLoaders: 1,
              },
            },

            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  postcssFocus(),
                  cssnext({
                    browsers: ['last 2 versions', 'IE > 10'],
                  }),
                  cssnano({
                    autoprefixer: false,
                  }),
                  postcssReporter({
                    clearMessages: true,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      // {
      //   test: /\.s?css$/,
      //   include: /node_modules/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin({
      filename: 'app.[contenthash].css',
      allChunks: true,
    }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
