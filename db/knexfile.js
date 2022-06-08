// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
      client: 'postgresql',
      connection: {
          connectionString: process.env.DATABASE_URI,
          ssl: { rejectUnauthorized: false }
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      },
  },

  staging: {
      client: 'postgresql',
      connection: {
          connectionString: process.env.DATABASE_URI,
          ssl: { rejectUnauthorized: false }
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      },
  },

  production: {
      client: 'postgresql',
      connection: {
          connectionString: process.env.DATABASE_URI,
          ssl: { rejectUnauthorized: false }
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      },
  }

};
