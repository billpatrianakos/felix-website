// Site-wide navigation
// ====================

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav className="global-nav">
        <ul>
          <li><Link to="/" className="logo">Felix & Friends</Link></li>
          <li><Link to="/log">The Log</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/discography">Discography</Link></li>
          <li><Link to="/merch">Merch(andise)</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
