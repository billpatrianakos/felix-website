// Create songs table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('songs', (table) => {
      table.increments();
      table.integer('album_id').unsigned();
      table.foreign('album_id').references('id').inTable('albums');
      table.string('title');
      table.integer('track_number').unsigned();
      table.string('notes');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('songs')
  ]);
};
