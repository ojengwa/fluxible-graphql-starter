exports.up = function up(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('students_hobbies', (table) => {
            table.increments('id').unsigned().primary();

            table.integer('student_id').unsigned().references('id').inTable('students');
            table.integer('hobby_id').unsigned().references('id').inTable('hobbies');

            table.timestamps(true, true);
            table.timestamp('deleted_at').nullable();

        })
    ]);
};

exports.down = function down(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('students_hobbies')
    ]);
};
