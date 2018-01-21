// React And Redux Setup
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

import configureStore from '../../client/store';
import { fetchData as fetchComponentData } from '../../server/utils';

// Import required modules
import routes from '../../client/routes';

// Render Initial HTML body
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest =
    process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest =
    process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}
       <style>
       @font-face {
        font-family: "greycliff";
        src: url("/client/assets/fonts/greycliffcf-bold-webfont.woff2") format("woff2"),
          url("/client/assets/fonts/greycliffcf-bold-webfont.woff") format("woff"),
          url("/client/assets/fonts/greycliffcf-bold-webfont.tff") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
     @font-face {
        font-family: "greycliff_cflight";
        src: url("/client/assets/fonts/greycliffcf-light-webfont.woff2") format("woff2"),
          url("/client/assets/fonts/greycliffcf-light-webfont.woff") format("woff"),
          url("/client/assets/fonts/greycliffcf-light-webfont.tff") format("truetype");
        font-weight: normal;
        font-style: normal;
      }</style>
        ${
  process.env.NODE_ENV === 'production'
    ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />`
    : ''
}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${
  process.env.NODE_ENV === 'production'
    ? `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>`
    : ''
}
        </script>
        <script src='${
  process.env.NODE_ENV === 'production'
    ? assetsManifest['/vendor.js']
    : '/vendor.js'
}'></script>
        <script src='${
  process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'
}'></script>
      </body>
    </html>
  `;
};

const renderError = (err) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace =
    process.env.NODE_ENV !== 'production'
      ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(
        /\n/g,
        `<br>${softTab}`,
      )}</pre>`
      : '';

  return renderFullPage(`Server Error${errTrace}`, {});
};

export default (app) => {
  // Server Side Rendering based on routes matched by React-router.
  app.use((req, res, next) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).end(renderError(err));
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return next();
      }

      const store = configureStore();

      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const initialView = renderToString(<Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>);
          const finalState = store.getState();

          res
            .set('Content-Type', 'text/html')
            .status(200)
            .end(renderFullPage(initialView, finalState));
        })
        .catch(error => next(error));
    });
  });
};
