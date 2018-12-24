import * as _ from "lodash";
import bookshelf from '../bookshelf';

export class Student extends bookshelf.Model {

    get tableName() {
        return "students";
    }
    get hasTimestamps() {
        return ["created_at", "updated_at", "deleted_at"];
    }

    hobbies()  {
        return this.hasMany(Hobby);
    }

    parse(response) {
        return _.mapKeys(response, (value, key) => {
            return _.camelCase(key);
        });
    }
    format(attributes) {
        return _.mapKeys(attributes, (value, key) => {
            return _.snakeCase(key);
        });
    }
}

// Normalized user relation
export class Hobby extends bookshelf.Model {

    get tableName() {
        return "hobbies";
    }
    get hasTimestamps() {
        return ["created_at", "updated_at", "deleted_at"];
    }

    students()  {
        return this.hasMany(Students);
    }

    parse(response) {
        return _.mapKeys(response, (value, key) => {
            return _.camelCase(key);
        });
    }
    format(attributes) {
        return _.mapKeys(attributes, (value, key) => {
            return _.snakeCase(key);
        });
    }
}
