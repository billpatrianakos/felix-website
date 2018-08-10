// Authentication endpoint
// =======================

const express         = require('express');
const AuthController  = express.Router();
const jwtMW           = require(__dirname + '/../lib/jwt-middleware');
const jwt             = require('jsonwebtoken');
const config          = require(__dirname + '/../config/app')[process.env.NODE_ENV || 'development'];

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
    const testUser = {
      username: 'user',
      password: 'password'
    };
    console.log('BODY OF REQUEST: ', req.body);
    const {username, password} = req.body;

    if (username === testUser.username && password === testUser.password) {
      let token = jwt.sign({id: 1, username: testUser.username}, config.jwt.secret, {expiresIn: '10h'})
      res.json({
        error: false,
        token: token
      });
    } else {
      res.status(401).json({
        error: 'Username or password is incorrect',
        token: null
      });
    }
  });

module.exports = AuthController;
