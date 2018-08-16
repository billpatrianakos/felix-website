// Database setup
// ==============

const knex      = require('knex')(require(__dirname + '/../knexfile')[process.env.NODE_ENV || 'development']);
const Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin(['registry', 'virtuals', 'visibility', 'pagination']);

module.exports = Bookshelf;
