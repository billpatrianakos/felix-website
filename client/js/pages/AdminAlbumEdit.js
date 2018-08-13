// Edit Album Page Component
// =========================

import React, { Component } from 'react';
import withAuth from '../hoc/withAuth';
import { Helmet } from 'react-helmet';
import AuthService from '../services/AuthService';

const Auth = new AuthService(process.env.API_URL);

class AdminAlbumEdit extends Component {
  constructor() {
    // console.log(match);
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { submitSuccessful: false, title: '', release_date: '', description: '', cover_art: '', itunes_url: '', bandcamp_url: '', apple_music_url: '', spotify_url: '', type: '' };
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
    
    if (!Auth.loggedIn()) {
      this.props.history.replace('/');
    } else {
      let state = this.state;

      fetch(`${process.env.API_URL}/api/albums`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Auth.getToken()
        },
        body: JSON.stringify(state)
      }).then(res => res.json())
        .then(res => {
          if (res.error) {
            alert('ERROR: ' + res.message);
          } else {
            this.setState({
              submitSuccessful: true, title: '', release_date: '', description: '', cover_art: '', itunes_url: '', bandcamp_url: '', apple_music_url: '', spotify_url: '', type: ''
            });
          }
        });
    }
  }

  render() {
    // console.log(match);
    return (
      <div>
        <Helmet>
          <title>New Album | Admin Panel | Felix & Friends</title>
        </Helmet>
        <h2>New Album Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
          </label>
          <label>
            <input type="date" name="release_date" value={this.state.release_date} onChange={this.handleChange} placeholder="Release Date" />
          </label>
          <label>
            <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Description"></textarea>
          </label>
          <label>
            <input type="text" name="cover_art" value={this.state.cover_art} onChange={this.handleChange} placeholder="Cover art URL" />
          </label>
          <label>
            <input type="text" name="itunes_url" value={this.state.itunes_url} onChange={this.handleChange} placeholder="iTunes URL" />
          </label>
          <label>
            <input type="text" name="bandcamp_url" value={this.state.bandcamp_url} onChange={this.handleChange} placeholder="Bandcamp URL" />
          </label>
          <label>
            <input type="text" name="apple_music_url" value={this.state.apple_music_url} onChange={this.handleChange} placeholder="Apple Music URL" />
          </label>
          <label>
            <input type="text" name="spotify_url" value={this.state.spotify_url} onChange={this.handleChange} placeholder="Spotify URL" />
          </label>
          <label>
            <select name="type" value={this.state.type} onChange={this.handleChange}>
              <option value=''>Album type</option>
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

export default withAuth(AdminAlbumEdit);
