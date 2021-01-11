import React from 'react';
import { renderRoutes } from 'react-router-config';

class RootLayout extends React.Component {
  render() {
    const { route } = this.props;
    return (
      <div>
        <div>Header</div>
        {renderRoutes(route.routes)}
        <div>Footer</div>
      </div>
    );
  }
}

export default {
  component: RootLayout,
};
