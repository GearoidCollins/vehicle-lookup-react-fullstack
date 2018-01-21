import defaultEnvConfig from './default';

export default {
  db: {
    uri:
      process.env.MONGO_URL ||
      process.env.MONGOHQ_URL ||
      process.env.MONGOLAB_URI ||
      `mongodb://${process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost'}/vehicle-lookup`,
    options: {
      user: '',
      pass: '',
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false,
  },
  API: {
    vrtme: {
      URL: 'https://api.vrtme.ie/api/vendor/singlevehicle',
      // TOKEN: '298736ce066e46a009b29535ee68da2037afd6fc', // Test token
    },
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      // stream: 'access.log'
    },
  },
  app: {
    title: `${defaultEnvConfig.app.title} - Development Environment`,
  },
  livereload: true,
  seedDB: process.env.MONGO_SEED || false,
};
