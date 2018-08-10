// User seeds
// ==========
const bcrypt  = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => bcrypt.hash('password', 12))
    .then(function (hash) {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'felix', email: 'felix@localhost.com', password: hash, first_name: 'Felix', bio: 'The default user.', created_at: new Date(), updated_at: new Date() }
      ]);
    });
};
