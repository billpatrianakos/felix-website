// Track Component
// ===============

import React, { Component } from 'react';

class Track extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let trackNumber = this.props.trackOrder;
    this.props.updateTrack(e, trackNumber);
  }

  render() {
    return (
      <div className="form-group">
        <label>
          <input type="text" name="title" onChange={this.handleChange} value={this.props.title} />
        </label>
        <label>
          <textarea name="notes" onChange={this.handleChange} value={this.props.notes}></textarea>
        </label>
      </div>
    );
  }
}

export default Track;
