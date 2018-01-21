import _ from 'lodash';
import chalk from 'chalk';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

/**
 * Get files by glob patterns
 */
const getGlobbedPaths = (globPatterns, excludes) => {
  // URL paths regex
  const urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  let output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map((file) => {
          if (_.isArray(excludes)) {
            for (const i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};

/**
 * Validate NODE_ENV existence
 */
const validateEnvironmentVariable = () => {
  const environmentFiles = glob.sync(`./config/env/${process.env.NODE_ENV}.js`);
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red(`+ Error: No configuration file found for "${
        process.env.NODE_ENV
      }" environment using development instead`));
    } else {
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  // Reset console color
  console.log(chalk.white(''));
};

/**
 * Validate Secure=true parameter can actually be turned on
 * because it requires certs and key files to be available
 */
const validateSecureMode = function (config) {
  if (!config.secure || config.secure.ssl !== true) {
    return true;
  }

  // const privateKey = fs.existsSync(path.resolve(config.secure.privateKey));
  // const certificate = fs.existsSync(path.resolve(config.secure.certificate));

  // if (!privateKey || !certificate) {
  //   console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
  //   console.log(chalk.red('  To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
  //   console.log();
  // }
  config.secure.ssl = false;
};

/**
 * Initialize global configuration files
 */
const initGlobalConfigFolders = (config, assets) => {
  // Appending files
  config.folders = {
    server: {},
    client: {},
  };

  // Setting globbed client paths
  config.folders.client = getGlobbedPaths(
    [path.join(process.cwd(), 'client/'), path.join(process.cwd(), 'dist/')],
    process.cwd().replace(new RegExp(/\\/g), '/'),
  );
};

/**
 * Initialize global configuration files
 */
const initGlobalConfigFiles = (config, assets) => {
  // Appending files
  config.files = {
    server: {},
    client: {},
  };
  // Setting Globbed model files
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Setting Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);

  // Setting Globbed js files
  config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, ['public/']));

  // Setting Globbed css files
  config.files.client.css = getGlobbedPaths(assets.client.lib.css, 'public/').concat(getGlobbedPaths(assets.client.css, ['public/']));

  // Setting Globbed test files
  config.files.client.tests = getGlobbedPaths(assets.client.tests);
};

/**
 * Initialize global configuration
 */
const initGlobalConfig = () => {
  // Validate NODE_ENV existence
  validateEnvironmentVariable();

  // Get the default assets
  const defaultAssets = require('./assets/default').default;

  // Get the current assets
  const environmentAssets = require(`./assets/${process.env.NODE_ENV}`).default || {};

  // Merge assets
  const assets = _.merge(defaultAssets, environmentAssets);

  // Get the default config
  const defaultConfig = require('./env/default').default;

  // Get the current config
  const environmentConfig = require(`./env/${process.env.NODE_ENV}`).default || {};

  // Merge config files
  const config = _.merge(defaultConfig, environmentConfig);

  config.pkg = require('../package.json');

  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  // Initialize global globbed folders
  initGlobalConfigFolders(config, assets);

  // Validate Secure SSL mode can be used
  validateSecureMode(config);

  // Expose configuration utilities
  config.utils = {
    getGlobbedPaths,
  };

  return config;
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();
