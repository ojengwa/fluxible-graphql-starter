// http://stackabuse.com/bookshelf-js-a-node-js-orm/
import Knex from 'knex';
import Bookshelf from 'bookshelf';
import knexConfig from './knexfile';

const knex = Knex(knexConfig[process.env.NODE_ENV]);
const bookshelf = Bookshelf(knex);

// register bookshelf plugins
bookshelf.plugin("registry");
bookshelf.plugin(["virtuals"]);

export default bookshelf;
