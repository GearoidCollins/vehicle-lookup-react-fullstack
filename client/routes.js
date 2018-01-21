/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './container/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = (deps, callback) => {
    callback(require);
  };
}

if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./components/Home');
}

// react-router setup with code-splitting
// This will only benefit us if we decide to add more pages
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./components/Home').default);
        });
      }}
    />
  </Route>
);
