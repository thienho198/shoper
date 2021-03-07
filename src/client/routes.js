import React from 'react';
import RootLayout from './modules/root-layout';
import Loadable from 'react-loadable';
import {loadData as loadDataHomePage} from './modules/home/loadData';
const HomePage = Loadable({
  loader: () => import('./modules/home'),
  loading() {
    return <div>Loading...</div>
  }
});

export default [
  {
    ...RootLayout,
    routes: [
      {
        component:HomePage,
        loadData: loadDataHomePage,
        path: '/',
        exact: true,
      },
    ],
  },
];
