// Users endpoint
// ===============

const express           = require('express');
const UsersController   = express.Router();

UsersController.route('/?')
  .get((req, res, next) => {
    res.send('Finish this route');
  });

module.exports = UsersController;
