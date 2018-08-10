// AuthService
// ===========
// Methods useful for JWT authentication

import decode from 'jwt-decode';

export default class AuthService {
  constructor(domain) {
    this.domain         = domain || process.env.API_URL;
    this.fetch          = this.fetch.bind(this);
    this.login          = this.login.bind(this);
    this.logout         = this.logout.bind(this);
    this.loggedIn       = this.loggedIn.bind(this);
    this.isTokenExpired = this.isTokenExpired.bind(this);
    this.setToken       = this.setToken.bind(this);
    this.getToken       = this.getToken.bind(this);
    this.getProfile     = this.getProfile.bind(this);
    this._checkStatus   = this._checkStatus.bind(this);
  }

  // Authenticate and get a JWT from the API
  login(username, password) {
    return this.fetch(`${this.domain}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => {
        this.setToken(res.token);
        return Promise.resolve(res);
      });
  }

  // Check if user's token is still valid
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch(err) { return false; }
  }

  // Save token to localStorage
  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Clearn token from localStorage
  logout() {
    localStorage.removeItem('id_token');
  }

  // Decode the token
  getProfile() {
    return decode(this.getToken());
  }

  // Do the API calls
  fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    return fetch(url, {
      headers: headers,
      method: options.method,
      body: options.body
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  // Raise errors if response is not 200
  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
