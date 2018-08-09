// Posts endpoint
// ==============

const express           = require('express');
const PostsController   = express.Router();

PostsController.route('/?')
  .get((req, res, next) => {
    res.send('Finish this route');
  });

module.exports = PostsController;
