const _tablename = 'students_hobbies';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex(_tablename).del()
        .then(function () {
            // Inserts seed entries
            return knex(_tablename).insert([
                {student_id: 1, hobby_id: 4},
                {student_id: 2, hobby_id: 4},
                {student_id: 3, hobby_id: 1}
            ]);
        }).catch(error => {
            console.error(error.stack);

        });
};
