// Discography (albums) page
// =========================

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

class AlbumContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {
        title: '',
        release_date: '',
        tracklist: []
      }
    };
  }

  componentDidMount() {
    fetch(`${process.env.API_URL}/api/albums/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('ERROR: ' + res.message);
        } else {
          this.setState({ album: res.album });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="main-content">
        <Helmet>
          <title>{this.state.album.title} ({moment(this.state.album.release_date).format('YYYY')}) | Discography | Felix & Friends</title>
        </Helmet>
        <h2>{this.state.album.title}</h2>
        <p>{this.state.album.description}</p>
        <ul>
          { _.sortBy(this.state.album.tracklist, ['track_number']).map((track, i) => <Track track={track} key={i} />) }
        </ul>
        <p><Link to="/albums">&larr; Back</Link></p>
      </div>
    );
  }
}

class Track extends Component {
  render() {
    return (
      <li>{this.props.track.track_number}. {this.props.track.title}</li>
    );
  }
}

export default AlbumContainer;
