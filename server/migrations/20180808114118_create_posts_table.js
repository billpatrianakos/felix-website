// Create Posts table
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', (table) => {
      table.increments();
      table.string('title');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').inTable('users');
      table.text('body');
      table.text('body_markdown');
      table.boolean('featured');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts')
  ]);
};
