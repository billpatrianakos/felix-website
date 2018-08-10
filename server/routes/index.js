// View Routes
// ===========
// Routes that render a view

'use strict';

const _         = require('lodash');
const fs        = require('fs');
const excluded  = ['index'];

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    // Remove extension from file name
    var basename = file.split('.')[0];

    // Only load files that aren't directories and aren't blacklisted
    if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && !_.includes(excluded, file)) {
      app.use('/' + basename, require('./' + file));
    }
  });
};
