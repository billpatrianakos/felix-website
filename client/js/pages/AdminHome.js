// Admin Home
// ==========

import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import withAuth from '../hoc/withAuth';

const Auth = new AuthService();

class AdminHome extends Component {
  handleLogout() {
    Auth.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <section className="main-content">
        <div className="banner-home">
          <h2>Protected Page</h2>
          <button type="button" onClick={this.handleLogout.bind(this)}>Log out</button>
        </div>
      </section>
    );
  }
}

export default withAuth(AdminHome);
