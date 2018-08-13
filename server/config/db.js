// Database setup
// ==============

const knex      = require('knex')(require(__dirname + '/../knexfile')[process.env.NODE_ENV || 'development']);
const Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');
Bookshelf.plugin('virtuals');
Bookshelf.plugin('visibility');
Bookshelf.plugin('pagination');

module.exports = Bookshelf;
