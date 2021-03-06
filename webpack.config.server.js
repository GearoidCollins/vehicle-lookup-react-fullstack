const path = require('path');
const ExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
  entry: path.resolve(__dirname, './config/lib/app.js'),

  output: {
    path: `${__dirname}/dist/`,
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-0'],
            plugins: [
              [
                'babel-plugin-webpack-loaders',
                {
                  config: './webpack.config.babel.js',
                  verbose: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, 'node_modules'),
    }),
  ],
};
