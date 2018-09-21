// Homepage
// ========

import React, { Component } from 'react';

class AboutContainer extends Component {
  render() {
    const aboutText = process.env.ABOUT_TEXT;
    return (
      <section className="main-content">
        <div className="banner-home">
          <p>Test: {aboutText}</p>
        </div>
      </section>
    );
  }
}

export default AboutContainer;
