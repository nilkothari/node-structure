import { makeExecutableSchema } from 'apollo-server-express';

import queries from './queries';

import { typeDefs } from './types';
const resolvers = {
  ...queries,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
