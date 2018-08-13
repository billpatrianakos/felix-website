// New Album Page Component
// ========================

import React, { Component } from 'react';
import withAuth from '../hoc/withAuth';
import { Helmet } from 'react-helmet';
import AuthService from '../services/AuthService';

const Auth = new AuthService(process.env.API_URL);

class AdminAlbumNew extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Submit form logic
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>New Album | Admin Panel | Felix & Friends</title>
        </Helmet>
        <h2>New Album Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="title" onChange={this.handleChange} placeholder="Title" />
          </label>
          <label>
            <input type="date" name="release_date" onChange={this.handleChange} placeholder="Release Date" />
          </label>
          <label>
            <textarea name="description" onChange={this.handleChange} placeholder="Description"></textarea>
          </label>
          <label>
            <input type="text" name="cover_art" onChange={this.handleChange} placeholder="Cover art URL" />
          </label>
          <label>
            <input type="text" name="itunes_url" onChange={this.handleChange} placeholder="iTunes URL" />
          </label>
          <label>
            <input type="text" name="bandcamp_url" onChange={this.handleChange} placeholder="Bandcamp URL" />
          </label>
          <label>
            <input type="text" name="apple_music_url" onChange={this.handleChange} placeholder="Apple Music URL" />
          </label>
          <label>
            <input type="text" name="spotify_url" onChange={this.handleChange} placeholder="Spotify URL" />
          </label>
          <label>
            <select name="type">
              <option value="EP">EP</option>
              <option value="LP">LP</option>
              <option value="Single">Single</option>
              <option value="Album">Album</option>
            </select>
          </label>
          <label>
            <input type="submit" value="Save Album" />
          </label>
        </form>
      </div>
    );
  }
}

export default withAuth(AdminAlbumNew);
