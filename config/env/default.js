export default {
  app: {
    title: '',
    description: 'Fullstack JS application DVLA VRT Lookups',
    keywords: 'mongodb, express, ReactJS, node.js, mongoose',
    googleAnalyticsTrackingID:
      process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID',
  },
  db: {
    promise: global.Promise,
  },

  port: process.env.PORT || 8000,
  host: process.env.HOST || '0.0.0.0',
  domain: process.env.DOMAIN,
  validation: {
    reg: /(^[A-z]{2}[0-9]{2}\s?[A-z]{3}$)|(^[A-z][0-9]{1,3}[A-z]{3}$)|(^[A-z]{3}[0-9]{1,3}[A-z]$)|(^[0-9]{1,4}[A-z]{1,2}$)|(^[0-9]{1,3}[A-z]{1,3}$)|(^[A-z]{1,2}[0-9]{1,4}$)|(^[A-z]{1,3}[0-9]{1,3}$)/,
  },
  sessionSecret: process.env.SESSION_SECRET || 'This is a secret dont tell',
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  csrf: {
    csrf: false,
    csp: false,
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    xssProtection: true,
  },
  logo: 'modules/core/client/img/brand/logo.png',
  favicon: 'modules/core/client/img/brand/favicon.ico',
};
