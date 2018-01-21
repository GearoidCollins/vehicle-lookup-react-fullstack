if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./dist/client/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(
    require('./dist/client/chunk-manifest.json')
  );
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    plugins: [
      [
        'webpack-aliases',
        {
          config: './webpack.config.babel.js',
        },
      ],
      [
        'babel-plugin-webpack-loaders',
        {
          config: './webpack.config.babel.js',
          verbose: false,
        },
      ],
    ],
  });

  /**
   *
   * Polyfill for support of ES6 in Node v8
   *
   */
  require('babel-polyfill');

  const app = require('./config/lib/app');

  const server = app.start();
}
