/* eslint no-console: [0] */
import chalk from 'chalk';
import path from 'path';
import mongoose from 'mongoose';

import config from '..';

module.exports = {
  // Load the mongoose models
  loadModels(callback) {
    // Globbing model files
    config.files.server.models.forEach((modelPath) => {
      require(path.resolve(modelPath));
    });

    if (callback) callback();
  },

  // Initialize Mongoose
  connect(callback) {
    mongoose.Promise = config.db.promise;

    return mongoose
      .connect(config.db.uri, config.db.options || {})
      .then((connection) => {
        // Enabling mongoose debug mode if required
        mongoose.set('debug', config.db.debug);

        // Call callback FN
        if (callback) callback(connection.db);
        return connection.db;
      })
      .catch((err) => {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(err);
      });
  },

  disconnect(cb) {
    mongoose.connection.db.close((err) => {
      console.info(chalk.yellow('Disconnected from MongoDB.'));
      return cb(err);
    });
  },
};
