// Log (blog) page
// ===============

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class LogContainer extends Component {
  render() {
    return (
      <section className="main-content">
        <Helmet>
          <title>Log</title>
        </Helmet>
        <h2>Logged content</h2>
      </section>
    );
  }
}

export default LogContainer;
