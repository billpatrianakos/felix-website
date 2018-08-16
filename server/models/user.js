// User Model
// ==========
const Bookshelf = require(__dirname + '/../config/db');
require('./post');

let User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  posts: function() {
    return this.hasMany('Post');
  },
  hidden: ['username', 'password', 'created_at', 'updated_at']
});

module.exports = Bookshelf.model('User', User);
