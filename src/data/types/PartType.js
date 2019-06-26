import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const PartType = new ObjectType({
  name: 'Part',
  fields: {
    author_uuid: { type: StringType },
    collection_id: { type: new NonNull(StringType) },
    description: { type: StringType },
    gene_id: { type: new NonNull(StringType) },
    name: { type: new NonNull(StringType) },
    optimized_sequence: { type: new NonNull(StringType) },
    original_sequence: { type: new NonNull(StringType) },
    part_type: { type: new NonNull(StringType) },
    status: { type: new NonNull(StringType) },
    synthesized_sequence: { type: new NonNull(StringType) },
    time_created: { type: new NonNull(StringType) },
    time_updated: { type: StringType },
    uuid: { type: new NonNull(StringType) },    
  },
});

export default PartType;
