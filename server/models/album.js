// Album model
// ===========
const Bookshelf = require(__dirname + '/../config/db');
require('./song');

let Album = Bookshelf.Model.extend({
  tableName: 'albums',
  hasTimestamps: true,
  tracklist: function() {
    return this.hasMany('Song');
  }
});

module.exports = Bookshelf.model('Album', Album);
