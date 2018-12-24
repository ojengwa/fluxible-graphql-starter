const knexSeeder = require('knex-seeder');

const _tablename = 'hobbies';
const queries = 20;

const fieldModel = new knexSeeder.FieldModelBuilder({
    title: new knexSeeder.SeedFaker('lorem.word'),
    description: new knexSeeder.SeedFaker('lorem.paragraph'),

    created_at: new knexSeeder.SeedFaker('date.recent'),
    updated_at: new knexSeeder.SeedFaker('date.recent')
})

const TableModelBuilder = new knexSeeder.TableModelBuilder(_tablename, fieldModel).build;

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex(_tablename).del()
        .then(async () => {
            // Inserts seed entries
            await knexSeeder.Seeder.seed(TableModelBuilder, queries)
                .then(() => {
                    console.log(`${_tablename} seeding complete.`);
                })
        }).catch(error => {
            console.error(error.stack);

        });
};
