// Songs endpoint
// ===============

const express           = require('express');
const SongsController   = express.Router();

SongsController.route('/?')
  .get((req, res, next) => {
    res.send('Finish this route');
  });

module.exports = SongsController;
