exports.up = function up(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('students', (table) => {
            table.increments('id').primary();

            table.string('first_name').notNull();
            table.string('last_name').notNull();
            table.date('birthday').notNull();
            table.string('photo').notNull();

            table.timestamps(true, true);
            table.timestamp('deleted_at').nullable();
        }),
    ]);
};

exports.down = function down(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('students'),
    ]);
};
