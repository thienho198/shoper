import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '/client/routes';
import assetsLocation from '../../../webpack-assets.json';

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  const helmet = Helmet.renderStatic();

  return `<!DOCTYPE html>
            <head>
               ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
                      /</g,
                      '\\u003c'
                    )}
                </script>
                <script src=${assetsLocation.main.js}></script>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </body>
    </html>`;
};
