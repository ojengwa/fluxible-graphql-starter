import * as _ from 'lodash';
import { Hobby } from '../../db/models';


const HobbyService = {
    name: 'hobby',
    read: async (req, resource, params, config, callback) => {
        new Hobby()
            .fetchAll({ require: true, withRelated: ['students'] })
            .then(results => {
                callback(null, resolve(
                    results
                        .toJSON()
                        .map(x => _.omit(x, ["createdAt", "deletedAt"]))
                ));
            })
            .catch(error => {
                callback(reject(error.message), null);
            });
    },
    create: function (req, resource, params, body, config, callback) {
        var newHobby = {
            title: params.title,
            description: params.description
        };

        new Hobby(newHobby)
            .save()
            .then((saved) => {

                callback(null, resolve(_.omit(saved.toJSON(), ["createdAt", "deletedAt"])))
            })
            .catch(error => {
                callback(reject(error.message), null);
            });

    },
    update: async (req, resource, params, body, config, callback) => {

        const _hobby = await new Hobby({
            id: params.id
        });

        _hobby.fetch({ require: true })
            .then(queryResult => {
                if (queryResult) {
                    callback(reject('Hobby not found.', null))
                } else {
                    _hobby.save(params)
                        .then(async updated => {
                            callback(null, resolve(_.omit(updated.toJSON(), [
                                "createdAt",
                                "deletedAt"
                            ])));
                        });
                }
            })
            .catch(error => {
                callback(reject(error.message), null);
            });

    },
    delete: async (req, resource, params, config, callback) => {

        new Hobby({
            id: params.id
        })
            .destroy({ require: true })
            .then(async deleted => {
                callback(null, resolve('Resource deleted.'))
            })
            .catch(error => {
                callback(reject(error.message), null);
            });
    }
};

export default HobbyService;
