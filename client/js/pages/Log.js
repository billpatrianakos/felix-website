// Log (blog) page
// ===============

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import trimHTML from 'trim-html';

class LogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    const endpoint = this.isSinglePost() ? this.props.match.params.slug : '';
    fetch(`${process.env.API_URL}/api/posts/${endpoint}`)
      .then(res => res.json())
      .then(res => {
        if (res.posts)
          this.setState({ posts: res.posts });
        else
          this.setState({ posts: [res.post] });
      });
  }

  componentDidUpdate(prevProps) {
    if (!(this.props.match && prevProps.match && this.props.match.params.slug === prevProps.match.params.slug)) {
      const endpoint = this.isSinglePost() ? this.props.match.params.slug : '';
      fetch(`${process.env.API_URL}/api/posts/${endpoint}`)
        .then(res => res.json())
        .then(res => {
          if (res.posts)
            this.setState({ posts: res.posts });
          else
            this.setState({ posts: [res.post] });
        });
    }
  }

  isSinglePost() {
    return this.props.match && this.props.match.params && this.props.match.params.slug;
  }

  render() {
    return (
      <section className="main-content">
        <Helmet>
          <title>Log | Felix & Friends</title>
        </Helmet>
        { this.state.posts.map((post, i) => <Post slug={post.slug} title={post.title} created_at={post.created_at} body={post.body} author={post.author} singlePost={this.isSinglePost()} key={i} />) }
      </section>
    );
  }
}

class Post extends Component {
  render() {
    let postBody = this.props.singlePost ? this.props.body : trimHTML(this.props.body, { limit: 450, suffix: '...' }).html;
    return (
      <div className="post post-list-item">
        <header>
          <h2>{ this.props.singlePost ? this.props.title : <Link to={`/log/${this.props.slug}`}>{this.props.title}</Link> }</h2>
          <p className="byline">
            <time dateTime={this.props.created_at}>{moment(this.props.created_at).format('MMMM Do YYYY')}</time> by {this.props.author.first_name}
          </p>
        </header>
        <div dangerouslySetInnerHTML={{__html: postBody}} />
      </div>
    );
  }
}

export default LogContainer;
