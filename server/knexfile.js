// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/db/dev.sqlite3'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    debug: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    seeds: {
      directory: './db/seeds/staging'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'REPLACE_ME',
      port: 5432, // On some systems it's 5433 - Run psql on the server and run the \conninfo command to find out your host and port
      user:     'REPLACE_ME',
      password: 'REPLACE_ME'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
