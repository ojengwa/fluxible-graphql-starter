const knexSeeder = require('knex-seeder');

const _tablename = 'students';
const queries = 10;

const fieldModel = new knexSeeder.FieldModelBuilder({
    first_name: new knexSeeder.SeedFaker('name.firstName'),
    last_name: new knexSeeder.SeedFaker('name.lastName'),
    birthday: new knexSeeder.SeedFaker('date.past'),
    photo: new knexSeeder.SeedFaker('image.imageUrl'),

    created_at: new knexSeeder.SeedFaker('date.recent'),
    updated_at: new knexSeeder.SeedFaker('date.recent')
})

const TableModelBuilder = new knexSeeder.TableModelBuilder(_tablename, fieldModel).build;

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex(_tablename).del()
        .then(async () => {
            // Inserts seed entries
            await knexSeeder.Seeder.seedAndClose(TableModelBuilder, queries)
                .then(() => {
                    console.log(`${_tablename} seeding complete.`);
                })
        }).catch(error => {
            console.error(error.stack);

        });
};
