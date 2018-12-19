// Admin Post Page
// ===============

import React, { Component } from 'react';
import withAuth from '../hoc/withAuth';
import { Helmet } from 'react-helmet';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';

const Auth = new AuthService(process.env.API_URL);

class AdminPost extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('/');
    } else {
      fetch(`${process.env.API_URL}/api/posts`)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            alert('ERROR: ' + res.message);
          } else {
            this.setState({ posts: res.posts });
          }
        })
        .catch(err => {
          alert('API request failed: ' + err);
        });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Posts | Admin Panel | {process.env.SITE_TITLE}</title>
        </Helmet>
        <h2>Posts</h2>
        { this.state.posts.length ? <PostList posts={this.state.posts} /> : <p>No posts to display yet.</p> }
      </div>
    );
  }
}

class PostList extends Component {
  render() {
    return (
      <ul>
        { this.props.posts.map((post, i) => <li key={i}><Link to={`/posts/${post.id}/edit`}>{post.title}</Link></li>) }
      </ul>
    );
  }
}

export default withAuth(AdminPost);
