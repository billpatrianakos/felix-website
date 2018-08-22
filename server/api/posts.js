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
      .orderBy('-featured')
      .orderBy('-created_at')
      .fetchPage({ withRelated: ['author'] })
      .then(posts => {
        res.json({ error: false, posts: posts });
      })
      .catch(err => {
        console.log(err);
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
    let key = !parseInt(req.params.id) ? 'slug' : 'id';
    new Post()
      .where({ [key]: req.params.id })
      .fetch({ require: true, withRelated: ['author'] })
      .then(post => {
        res.json({ error: false, post: post });
      })
      .catch(err => {
        console.log(err);
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

PostsController.route('/page/:page/?')
  // GET /api/posts/page/:page/
  // --------------------------
  // Get page X of results
  .get((req, res, next) => {
    new Post()
      .orderBy('-created_at')
      .fetchPage({ page: req.params.page, withRelated: ['author'] })
      .then(posts => {
        res.json({ error: false, posts: posts });
      })
      .catch(err => {
        console.log(err);
        res.json({ error: true, message: err });
      });
  });

module.exports = PostsController;
