import Express from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import lusca from 'lusca';
import methodOverride from 'method-override';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import helmet from 'helmet';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';

import config from '..';
import react from './react';

export const otherAll = (app) => {
  // Run Webpack dev server in development mode
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }));
    app.use(webpackHotMiddleware(compiler));
  }
};

/**
 * Initialize local variables
 */
export const initLocalVariables = (app) => {
  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  if (config.secure && config.secure.ssl === true) {
    app.locals.secure = config.secure.ssl;
  }
  app.locals.keywords = config.app.keywords;
  app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;
  app.locals.livereload = config.livereload;
  app.locals.logo = config.logo;
  app.locals.favicon = config.favicon;

  // Passing the request url to environment locals
  app.use((req, res, next) => {
    res.locals.host = `${req.protocol}://${req.hostname}`;
    res.locals.url = `https://${req.headers.host}${req.originalUrl}`;
    next();
  });
};

/**
 * Initialize application middleware
 */
export const initMiddleware = (app) => {
  // Showing stack errors
  app.set('showStackError', true);

  // Enable jsonp
  app.enable('jsonp callback');

  // Should be placed before express.static
  app.use(compress({
    filter: (req, res) => {
      return /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type'));
    },
    level: 9,
  }));

  // Express API monitor
  // app.use('/api/service/*', statusMonitor);

  // Initialize favicon middleware
  // app.use(favicon('./modules/core/client/img/brand/favicon.ico'));

  // // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));

    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(methodOverride());

  // Add the cookie parser and flash middleware
  app.use(cookieParser());
  app.use(flash());

  app.use(lusca(config.csrf));

  // only if you're behind a reverse proxy
  // (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
  app.enable('trust proxy');
};

/**
 * Configure Helmet headers configuration
 */
export const initHelmetHeaders = (app) => {
  // Use helmet to secure Express headers
  const SIX_MONTHS = 15778476000;

  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true,
  }));
  app.disable('x-powered-by');
};

/**
 * Configure the modules static routes
 */
export const initModulesClientRoutes = (app) => {
  // Setting the app router and static folder
  Express.static(path.resolve(__dirname, '../../dist/'));
  // Globbing static routing
  config.folders.client.forEach((staticPath) => {
    app.use(staticPath, Express.static(path.resolve(`./${staticPath}`)));
  });
};

/**
 * Invoke modules server configuration
 */
export const initModulesConfiguration = (app, db) => {
  config.files.server.configs.forEach((configPath) => {
    require(path.resolve(configPath))(app, db);
  });
};

/**
 * Configure the modules server routes
 */
export const initModulesServerRoutes = (app) => {
  // Globbing routing files
  config.files.server.routes.forEach((routePath) => {
    require(path.resolve(routePath)).default(app);
  });
};

/**
 * Configure error handling
 */
export const initErrorRoutes = (app) => {
  app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }

    // Log it
    console.error('@initErrorRoutes', err);

    // Redirect to error page
    // res.redirect('/server-error');
  });
};

export default function () {
  // Initialize the Express App
  const app = new Express();

  otherAll(app);

  // Initialize local variables
  initLocalVariables(app);

  // Initialize Express middleware
  initMiddleware(app);

  // Initialize Helmet security headers
  initHelmetHeaders(app);

  // Initialize modules static client routes
  initModulesClientRoutes(app);

  // Initialize modules static client routes
  initModulesServerRoutes(app);

  // initiate React server render
  react(app);

  // Initialize error routes
  initErrorRoutes(app);

  return app;
}
