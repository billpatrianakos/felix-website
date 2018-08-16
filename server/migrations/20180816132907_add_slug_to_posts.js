// Add a slug field to posts table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('posts', table => {
      table.string('slug').unique();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('posts', table => { table.dropColumn('slug'); })]);
};
