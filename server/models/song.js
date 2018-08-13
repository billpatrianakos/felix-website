// Song model
// ==========
const Bookshelf = require(__dirname + '/../config/db');
require('./album');

let Song = Bookshelf.Model.extend({
  tableName: 'songs',
  hasTimestamps: true,
  album: function() {
    return this.belongsTo('Album');
  }
});

module.exports = Bookshelf.model('Song', Song);
