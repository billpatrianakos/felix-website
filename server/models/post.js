// Post model
// ==========
const Bookshelf = require(__dirname + '../config/db');
require('./user');

let Post = Bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  author: function() {
    return this.belongsTo('User');
  }
});

module.exports = Bookshelf.model('Post', Post);
