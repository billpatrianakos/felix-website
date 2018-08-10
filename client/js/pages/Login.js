// Login Component
// ===============

import React, { Component } from 'react';
import AuthService from '../services/AuthService';

class Login extends Component {
  constructor() {
    super();
    this.handleChange     = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth             = new AuthService(process.env.API_URL);

    // this.state = {
    //   username: null,
    //   password: null
    // };
  }

  UNSAFE_componentWillMount() { // componentWillMount?
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/'); // Redirect to admin page if already logged in and trying to access login page
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(res => { /* eslint no-unused-vars: 1 */
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            className=""
            placeholder="Username"
            name="username"
            type="text"
            onChange={this.handleChange}
          />
          <input
            className=""
            placeholder="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

export default Login;
