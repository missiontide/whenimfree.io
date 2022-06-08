/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('availability', function (table) {
            table.increments('id');
            table.integer('scheduler_id').unsigned()
            table.foreign('scheduler_id').references('scheduler.id');
            table.string('name', 255);
            table.specificType('selectedIntervals', 'json');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('availability')
};
