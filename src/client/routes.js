import React from 'react';
import RootLayout from './modules/root-layout';
// import Loadable from 'react-loadable';
// import {loadData as loadDataHomePage} from './modules/home/loadData';
import HomePage from './pages/home/HomePage';
import SearchPage from './pages/search/SearchPage';

export default [
  {
    ...RootLayout,
    routes: [
      {
        ...SearchPage,
        path: '/',
        exact: true,
      },
      {
        ...SearchPage,
        path: '/search'
      }
    ],
  },
];
