import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import Routes from './routes';
import { store } from './store';
import { sayHello } from './store/actions/default';

import './assets/images'

// store.dispatch(checkLogin());
// store.dispatch(getOptions());
store.dispatch(sayHello());

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
