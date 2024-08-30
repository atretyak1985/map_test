import {type SchemaTypeDefinition} from 'sanity'
import poi from './poi';
import category from './category';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [poi, category],
}
