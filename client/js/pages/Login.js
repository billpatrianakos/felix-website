// Login Component
// ===============

import React, { Component } from 'react';
import AuthService from '../services/AuthService';

class Login extends Component {
  constructor() {
    super();
    this.handleChange     = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth             = new AuthService();
  }

  componentDidMount() { // componentWillMount?
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

    this.Auth.login(this.state.username. this.state.password)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <form>
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
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
