import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '/client/routes';
// import assetsLocation from '../../../webpack-assets.json';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
import manifest from '../../../public/react-loadable-ssr-addon.json'


export default (req, store, context) => {
  const modules = [];

  const content = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>

  );

  const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);
  const styles = bundles.css || [];
  const scripts = bundles.js || [];
  const helmet = Helmet.renderStatic();

  return `<!DOCTYPE html>
            <head>
               ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                
                ${styles.map(style => {
                  return `<link href="${style.file}" rel="stylesheet" />`;
                }).join('\n')}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
                      /</g,
                      '\\u003c'
                    )}
                </script>
                ${scripts.map(script => {
                  return `<script src="${script.file}"></script>`
                }).join('\n')}    
               
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
            </body>
    </html>`;
};
{/* <link rel="stylesheet" href="${assetsLocation.main.css}" /> 
<script src=${assetsLocation.main.js}></script> */}