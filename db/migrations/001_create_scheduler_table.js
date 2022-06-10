/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
      .createTable('scheduler', function (table) {
          table.increments('id');
          table.string('url', 255).notNullable();
          table.string('eventName', 255).notNullable();
          table.specificType('days', 'timestamp with time zone[]');
          table.datetime('startTime');
          table.datetime('endTime');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('scheduler')
};
