import React from 'react';
import Header from '../header/Header';
import { renderRoutes } from 'react-router-config';

class RootLayout extends React.Component {
  render() {
    const { route } = this.props;
    return (
      <div>
        <Header />
        {renderRoutes(route.routes)}
        <div>Footer</div>
      </div>
    );
  }
}

export default {
  component: RootLayout,
};
