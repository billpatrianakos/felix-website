// Posts endpoint
// ==============

const express           = require('express');
const PostsController   = express.Router();
const Post              = require(__dirname + '/../models/post');
const jwtMW             = require(__dirname + '/../lib/jwt-middleware');

PostsController.route('/?')
  // GET /api/posts/
  // ---------------
  // Fetch first page of blog posts
  .get((req, res, next) => {
    new Post()
      .fetchPage({ withRelated: ['author'] })
      .then(posts => {
        res.json({ error: false, posts: posts });
      })
      .catch(err => {
        res.json({ error: true, message: err });
      });
  })
  // POST /api/posts/
  // ----------------
  // Save new post
  .post(jwtMW, (req, res, next) => {
    new Post(req.body)
      .save(null, { require: true })
      .then(post => {
        res.json({ error: false, post: post });
      })
      .catch(err => {
        res.json({ error: true, message: err });
      });
  });

PostsController.route('/:id/?')
  // GET /api/posts/:id/
  // -------------------
  // Fetch single post
  .get((req, res, next) => {
    new Post({ id: req.params.id })
      .fetch({ require: true, withRelated: ['author'] })
      .then(post => {
        res.json({ error: false, post: post });
      })
      .catch(err => {
        res.json({ error: true, message: err });
      });
  })
  // PATCH /api/posts/:id/
  // --------------------
  // Update existing post
  .patch(jwtMW, (req, res, next) => {
    new Post({ id: req.params.id })
      .save(req.body, { require: true })
      .then(post => {
        res.json({ error: false, post: post });
      })
      .catch(err => {
        res.json({ error: true, message: err });
      });
  });

module.exports = PostsController;
