// JWT Middleware
// ==============

const exjwt   = require('express-jwt');
const config  = require(__dirname + '/../config/app')[process.env.NODE_ENV || 'development'].jwt;
const jwtMW   = exjwt(config);

module.exports = jwtMW;
