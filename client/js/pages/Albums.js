// Discography (albums) page
// =========================

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';

class AlbumContainer extends Component {
  constructor() {
    super();
    this.state = { albums: [] };
  }

  componentDidMount() {
    fetch(`${process.env.API_URL}/api/albums`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('ERROR: ' + res.message);
        } else {
          this.setState({ albums: res.albums });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="page">
        <Helmet>
          <title>Discography | Felix & Friends</title>
        </Helmet>
        { this.state.albums.map((album, i) => <Album album={album} key={i} />) }
      </div>
    );
  }
}

class Album extends Component {
  render() {
    return (
      <div className="album-tile">
        <h3><Link to={`/albums/${this.props.album.id}`}>{this.props.album.title}</Link></h3>
        <p><small>{moment(this.props.album.release_date).format('YYYY')}</small></p>
      </div>
    );
  }
}

export default AlbumContainer;
