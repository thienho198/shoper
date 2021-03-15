import React from 'react';
import RootLayout from './modules/root-layout';
// import Loadable from 'react-loadable';
// import {loadData as loadDataHomePage} from './modules/home/loadData';
import HomePage from './pages/home/HomePage';
import SearchPage from './pages/search/SearchPage';
import CartPage from './pages/cart/CartPage';

export default [
  {
    ...CartPage,
    path: '/cart'
  },
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
  }

];
