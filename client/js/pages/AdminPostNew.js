// Admin New Post Page
// ===================

import React, { Component } from 'react';
import withAuth from '../hoc/withAuth';
import { Helmet } from 'react-helmet';
import AuthService from '../services/AuthService';
import { withRouter } from 'react-router-dom';

const Auth = new AuthService(process.env.API_URL);

class AdminPostNew extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isNewPost    = this.isNewPost.bind(this);
    this.state        = {
      title: '',
      user_id: Auth.getProfile().id,
      body_markdown: '',
      featured: false,
      slug: ''
    };
  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('/');
    } else if (this.props.match && this.props.match.params && this.props.match.params.id) {
      fetch(`${process.env.API_URL}/api/posts/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            alert('ERROR: ' + res.message);
          } else {
            this.setState({
              title: res.post.title,
              user_id: res.post.author.id,
              body_markdown: res.post.body_markdown,
              featured: res.post.featured,
              slug: res.post.slug
            });
          }
        })
        .catch(err => {
          alert('API request failed: ' + err);
        });
    }
  }

  isNewPost() {
    return !(this.props.match && this.props.match.params && this.props.match.params.id);
  }

  handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const isNewPost = this.isNewPost();
    const endpoint  = isNewPost ? '' : `${this.props.match.params.id}`;
    const state     = this.state;
    
    fetch(`${process.env.API_URL}/api/posts/${endpoint}`, {
      method: isNewPost ? 'POST' : 'PATCH',
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
          this.props.history.replace('/posts');
        }
      });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.isNewPost() ? 'Create new' : 'Edit'} Post | Admin Panel | Felix & Friends</title>\
        </Helmet>
        <h2>{ this.isNewPost() ? 'New Post' : 'Edit Post' }</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Title" />
          </label>
          <label>
            <textarea name="body_markdown" onChange={this.handleChange} value={this.state.body_markdown} placeholder="Post. You can use Markdown here."></textarea>
          </label>
          <label>
            Featured post <input type="checkbox" name="featured" onChange={this.handleChange} checked={this.state.featured} />
          </label>
          <label>
            <input type="text" name="slug" onChange={this.handleChange} value={this.state.slug} placeholder="Post Slug" />
          </label>
          <input type="hidden" name="user_id" onChange={this.handleChange} value={this.state.user_id} />
          <hr />
          <input type="submit" value={ this.isNewPost() ? 'Save' : 'Update' } />
        </form>
      </div>
    );
  }
}

export default withAuth(withRouter(AdminPostNew));
