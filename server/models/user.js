// User Model
// ==========
const Bookshelf = require(__dirname + '/../config/db');
require('./post');

let User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = Bookshelf.model('User', User);
