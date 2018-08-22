// Homepage
// ========

import React, { Component } from 'react';

class AboutContainer extends Component {
  render() {
    let aboutText = process.env.ABOUT_TEXT;
    return (
      <section className="main-content">
        <div className="banner-home">
          Test: {aboutText}
        </div>
      </section>
    );
  }
}

export default AboutContainer;
