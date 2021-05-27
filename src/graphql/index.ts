import { makeExecutableSchema } from 'apollo-server-express';
import IsAuthenticatedDirective from './directives/isAuthenticated.directive';

import queries from './queries';

import { typeDefs } from './types';
const resolvers = {
  ...queries,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
  },
});
