// Authentication endpoint
// =======================

const express         = require('express');
const AuthController  = express.Router();
const jwtMW           = require(__dirname + '/../lib/jwt-middleware');
const jwt             = require('jsonwebtoken');
const config          = require(__dirname + '/../config/app')[process.env.NODE_ENV || 'development'];
const User            = require(__dirname + '/../models/user');
const bcrypt          = require('bcrypt');


AuthController.route('/?')
  // GET /api/auth/
  // --------------
  .get(jwtMW, (req, res, next) => {
    res.send('You are autenticated');
  });


AuthController.route('/login/?')
  // POST /api/auth/login/
  // ---------------------
  .post((req, res, next) => {
    const { username, password } = req.body;

    new User({ username: username })
      .fetch({ require: true })
      .then((user) => {
        bcrypt.compare(password, user.get('password'))
          .then((response) => {
            let token = jwt.sign({ id: user.id, username: user.username }, config.jwt.secret, { expiresIn: '10h' });

            res.json({ error: false, token: token });
          })
          .catch((err) => {
            res.status(401).json({ error: 'Username or password incorrect', token: null });
          });
      })
      .catch((err) => {
        // Handle find query error
        res.status(401).json({ error: 'Username or password incorrect', token: null });
      });
  });


module.exports = AuthController;
