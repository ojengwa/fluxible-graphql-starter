exports.up = function up(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('hobbies', (table) => {
            table.increments('id').unsigned().primary();

            table.string('title').notNull();
            table.text('description').nullable();

            table.timestamps(true, true);
            table.timestamp('deleted_at').nullable();
        }),
    ]);
};

exports.down = function down(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('hobbies'),
    ]);
};
