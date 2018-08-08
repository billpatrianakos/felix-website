// Create albums table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('albums', (table) => {
      table.increments();
      table.string('title');
      table.date('release_date');
      table.text('description');
      table.string('cover_art');
      table.string('itunes_url');
      table.string('bandcamp_url');
      table.string('apple_music_url');
      table.string('spotify_url');
      table.string('type'); // EP/LP/Album/Single/B Side
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('albums')
  ]);
};
