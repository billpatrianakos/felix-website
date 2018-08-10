// API Routes
// -----------
// Routes that respond to API requests

'use strict';

const _           = require('lodash');
const fs          = require('fs');
const cors        = require('cors');
const excluded    = ['index'];
const corsConfig  = require(__dirname + '/../config/app')[process.env.NODE_ENV || 'development'].cors;

module.exports = (app) => {
  // Enable CORS for all API routes
  app.use(cors(corsConfig));

  // Loop through all API routes and call app.use() on each of them
  fs.readdirSync(__dirname).forEach((file) => {
    // Remove extension from file name
    var basename = file.split('.')[0];

    // Only load files that aren't directories and aren't blacklisted
    if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && !_.includes(excluded, file)) {
      app.use('/api/' + basename, require('./' + file));
    }
  });
};
