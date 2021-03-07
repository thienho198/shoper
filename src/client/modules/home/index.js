import React from 'react';
import { Helmet } from 'react-helmet';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Home 1</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <div>Hello world yeah!</div>
      </React.Fragment>
    );
  }
}

export default Home ;

