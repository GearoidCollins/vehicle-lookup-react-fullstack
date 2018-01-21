/* eslint no-console: [0] */
import chalk from 'chalk';

import mongoose from './mongoose';
import express from './express';
import config from '..';

module.exports = {
  init(callback) {
    mongoose.loadModels();

    // Initialize express
    const app = express();

    mongoose.connect().then((db) => {
      if (callback) callback(app, db);
    });

    return app;
  },

  start(callback) {
    return this.init((app, db) => {
      // Start the app by listening on <port>
      app.listen(config.port, () => {
        // Logging initialization
        console.log('--');
        console.log(chalk.green(config.app.title));
        console.log(chalk.green(`Environment:\t\t\t${process.env.NODE_ENV}`));
        console.log(chalk.green(`Port:\t\t\t\t${config.port}`));
        console.log(chalk.green(`Database:\t\t\t\t${config.db.uri}`));
        if (process.env.NODE_ENV === 'secure') {
          console.log(chalk.green('HTTPs:\t\t\t\ton'));
        }
        console.log(chalk.green(`App version:\t\t\t${config.pkg.version}`));
        console.log('--');

        if (typeof callback === 'function') callback(app, db, config);
      });
      return app;
    });
  },
};
