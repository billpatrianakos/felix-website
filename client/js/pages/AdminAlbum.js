// Album Admin Page
// ================

import React, { Component } from 'react';
import withAuth from '../hoc/withAuth';
import { Helmet } from 'react-helmet';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';

const Auth = new AuthService(process.env.API_URL);

class AlbumAdmin extends Component {
  constructor() {
    super();
    this.state = { albums: [] };
  }

  componentDidMount() {
    // Get list of all albums
    if (!Auth.loggedIn()) {
      this.props.history.replace('/');
    } else {
      fetch(`${process.env.API_URL}/api/albums`)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            alert('ERROR: ' + res.message);
          } else {
            this.setState({ albums: res.albums });
          }
        });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Albums | Admin Panel | Felix & Friends</title>
        </Helmet>
        <h2>Album Admin Page</h2>
        { this.state.albums.length ? <AlbumList albums={this.state.albums} /> : null }
      </div>
    );
  }
}

// Renders a list of albums linked to their edit page
class AlbumList extends Component {
  render() {
    return (
      <ul>
        { this.props.albums.map((album, i) => {
          return (<li key={i}><Link to={`/albums/${album.id}/edit`}>{ album.title }</Link></li>);
        }) }
      </ul>
    );
  }
}

export default withAuth(AlbumAdmin);
