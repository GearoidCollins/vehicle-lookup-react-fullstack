export default {
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem',
  },
  port: process.env.PORT || 8443,
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
      TOKEN: '',
    },
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log',
    },
  },
  seedDB: process.env.MONGO_SEED || false,
};
