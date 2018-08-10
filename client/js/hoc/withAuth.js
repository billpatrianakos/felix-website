// withAuth - Higher order component for AuthService
// =================================================

import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(process.env.API_URL);

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      };
    }

    UNSAFE_componentWillMount() { // componentWillMount?
      // Redirect to login page if not logged in
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({ user: profile });
        } catch(err) {
          // Destroy the session and redirect to login page on error
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return (<div>Something went wrong or you are not logged in</div>);
      }
    }
  };
}
