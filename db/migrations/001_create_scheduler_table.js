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
          table.specificType('days', 'date[]').notNullable();
          table.datetime('startTime').notNullable();
          table.datetime('endTime').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('scheduler')
};
