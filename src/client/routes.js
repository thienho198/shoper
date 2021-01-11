import RootLayout from './modules/root-layout';
import Home from './modules/home';

export default [
  {
    ...RootLayout,
    routes: [
      {
        ...Home,
        path: '/',
        exact: true,
      },
    ],
  },
];
