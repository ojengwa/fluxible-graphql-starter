import graphQLSchema from '../db/schema';
import * as models from '../db/models';

const modelSchema = graphQLSchema(models);
export default modelSchema;
