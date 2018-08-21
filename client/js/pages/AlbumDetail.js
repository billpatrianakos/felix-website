// Discography (albums) page
// =========================

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';

class AlbumContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {
        title: '',
        release_date: ''
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
      <div className="page">
        <Helmet>
          <title>{this.state.album.title} ({moment(this.state.album.release_date).format('YYYY')}) | Discography | Felix & Friends</title>
        </Helmet>
        <Link to="/albums">Back</Link>
        <h2>{this.state.album.title}</h2>
      </div>
    );
  }
}

export default AlbumContainer;
