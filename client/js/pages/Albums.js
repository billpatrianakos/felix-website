// Discography (albums) page
// =========================

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

class AlbumContainer extends Component {
  constructor() {
    super();
    this.updateFilters = this.updateFilters.bind(this);
    this.state = {
      albums: [],
      filters: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.API_URL}/api/albums`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('ERROR: ' + res.message);
        } else {
          let state = this.state;
          state.albums = res.albums;
          this.setState(state);
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  updateFilters(e) {
    let state = this.state;
    if (e.target.checked) {
      state.filters.push(e.target.name);
    } else {
      state.filters.splice(state.filters.indexOf(e.target.name), 1);
    }
    this.setState(state);
  }

  render() {
    const filters = this.state.filters;
    const albums  = filters.length > 0 ? this.state.albums.filter(album => _.includes(filters, album.type.toLowerCase())) : this.state.albums;
    return (
      <div className="main-content">
        <Helmet>
          <title>Discography | {process.env.SITE_TITLE}</title>
        </Helmet>
        <h2 className="page-title">Discography</h2>
        <form className="album-filter">
          <label>
            Filter by release type: 
          </label>
          <label>Album  <input type="checkbox" name="album" onChange={this.updateFilters}   checked={this.state.filters.album} /></label>
          <label>Single <input type="checkbox" name="single" onChange={this.updateFilters}  checked={this.state.filters.album} /></label>
          <label>EP     <input type="checkbox" name="ep" onChange={this.updateFilters}      checked={this.state.filters.album} /></label>
          <label>LP     <input type="checkbox" name="lp" onChange={this.updateFilters}      checked={this.state.filters.album} /></label>
        </form>
        <div className="gallery-view">
          { albums.map((album, i) => <Album album={album} key={i} />) }
        </div>
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
