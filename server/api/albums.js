// Albums endpoint
// ===============

const express           = require('express');
const AlbumsController  = express.Router();

AlbumsController.route('/?')
  .get((req, res, next) => {
    res.send('Finish this route');
  });

module.exports = AlbumsController;
