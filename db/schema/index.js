import * as _ from 'lodash';
import * as graphQL from 'graphql';
import * as graphQLBookshelf from 'graphql-bookshelfjs';

const graphQLSchema =  (models) => {

    const HobbyType = new graphQL.GraphQLObjectType({
        name: 'Hobby',
        fields: {
            id: {
                type: graphQL.GraphQLInt,
            },
            title: {
                type: graphQL.GraphQLString,
            },
            description: {
                type: graphQL.GraphQLString,
            },
            // students: {
            //     type: new graphQL.GraphQLList(StudentType),
            //     resolve: graphQLBookshelf.resolverFactory(models.Student)
            // },
        },
    });

    const StudentType = new graphQL.GraphQLObjectType({
        name: 'Student',

        fields: {
            id: {
                type: graphQL.GraphQLInt,
            },
            firstName: {
                type: graphQL.GraphQLString,
            },
            lastName: {
                type: graphQL.GraphQLString,
            },
            birthday: {
                type: graphQL.GraphQLString,
            },
            photo: {
                type: graphQL.GraphQLString,
            },
            hobbies: {
                type: new graphQL.GraphQLList(HobbyType),
                resolve: graphQLBookshelf.resolverFactory(models.Hobby)
            },
        },
    });

    const RootQuery = new graphQL.GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            students: {
                type: new graphQL.GraphQLList(StudentType),
                args: {
                    id: {
                        type: graphQL.GraphQLInt,
                    },
                    from: {
                        type: graphQL.GraphQLInt,
                    },
                    limit: {
                        type: graphQL.GraphQLInt,
                    },
                },
                resolve: function resolver(modelInstance, args, context, info) {

                    // Defining extra using a function
                    const { from = 1, limit = 50 } = args;
                    const extra = (model) => {
                        model.query((db) => {
                            db.limit(limit);
                        });
                        if (from) model.where('id', '<', from);
                    };

                    const filteredArgs = _.omit(args, ['from', 'limit']);
                    const resolverFn = graphQLBookshelf.resolverFactory(models.Student);
                    return resolverFn(modelInstance, filteredArgs, context, info, extra);
                },
            },
        },
    });

    const Mutations = new graphQL.GraphQLObjectType({
        name: 'Mutations',
        description: 'Functions to set stuff',
        fields: {
            addStudent: {
                type: StudentType,
                args: {
                    id: {
                        type: graphQL.GraphQLInt,
                    },
                    firstName: {
                        type: graphQL.GraphQLString,
                    },
                    lastName: {
                        type: graphQL.GraphQLString,
                    },
                    birthday: {
                        type: graphQL.GraphQLString,
                    },
                    photo: {
                        type: graphQL.GraphQLString,
                    },
                    hobbies: {
                        type: new graphQL.GraphQLList(graphQL.GraphQLInt),
                        resolve: graphQLBookshelf.resolverFactory(models.Hobby)
                    },
                },
                resolve(source, args) {
                    return new models.Student({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        birthday: new Date(args.birthday),
                        photo: args.photo
                    }).save()
                    .then((saved) => {
                        if (params.hobbies) {
                            saved.hobbies.attach(params.hobbies);
                        }
                        return _.omit(saved.toJSON(), ["createdAt", "deletedAt"]);
                    });
                }
            },
            addHobby: {
                type: HobbyType,
                args: {
                    title: {
                        type: graphQL.GraphQLString,
                    },
                    description: {
                        type: graphQL.GraphQLNonNull(graphQL.GraphQLString)
                    }
                },
                resolve(source, params) {
                    return models.newHobby = {
                        title: params.title,
                        description: params.description
                    };
                    return new models.Hobby(newHobby)
                        .save()
                        .then((saved) => {

                            return _.omit(saved.toJSON(), ["createdAt", "deletedAt"])
                        })
                }
            }
        }
    });

    return new graphQL.GraphQLSchema({
        query: RootQuery,
        mutation: Mutations
    });
};

export default graphQLSchema;
