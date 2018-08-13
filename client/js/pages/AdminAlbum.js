// Album Admin Page
// ================

import React, { Component } from 'react';
import withAuth from '../hoc/withAuth';
import { Helmet } from 'react-helmet';

class AlbumAdmin extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Albums | Admin Panel | Felix & Friends</title>
        </Helmet>
        <h2>Album Admin Page</h2>
      </div>
    );
  }
}

export default withAuth(AlbumAdmin);
