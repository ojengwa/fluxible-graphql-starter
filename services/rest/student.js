import _ from 'lodash';
import { Student } from '../../db/models';


const StudentService = {
    name: 'student',
    read: async (req, resource, params, config, callback) => {
        new Student()
            .fetchAll({ require: true, withRelated: ['hobbies']})
            .then(results => {
                callback(null,
                    results
                        .toJSON()
                        .map(x => _.omit(x, ["createdAt", "deletedAt"]))
                );
            })
            .catch(error => {
                callback(error.message, null);
            });
    },
    create: function (req, resource, params, body, config, callback) {
        var newStudent = {
            firstName: params.firstName,
            lastName: params.lastName,
            birthday: params.birthday,
            photo: params.photo
        };

        new Student(newStudent)
            .save()
            .then((saved) => {
                if (params.hobbies) {
                    saved.hobbies.attach(params.hobbies);
                }
                callback(null, _.omit(saved.toJSON(), ["createdAt", "deletedAt"]))
            })
            .catch(error => {
                callback(error.message, null);
            });

    },
    update: async (req, resource, params, body, config, callback) => {

        const _student = await new Student({
            id: params.id
        });

        _student.fetch({ require: true })
            .then(queryResult => {
                if (queryResult) {
                    callback('Student not found.', null)
                } else {
                    _student.save(params)
                        .then( updated => {
                            callback(null, (_.omit(updated.toJSON(), [
                                "createdAt",
                                "deletedAt"
                            ])));
                        });
                }
            })
            .catch(error => {
                callback(error.message, null);
            });

    },
    delete: async(req, resource, params, config, callback) => {

        new Student({
            id: params.id
        })
        .destroy({require: true})
        .then(async deleted => {
            callback(null, 'Resource deleted.')
        })
        .catch(error => {
            callback(error.message, null);
        });
    }
};

export default StudentService;
