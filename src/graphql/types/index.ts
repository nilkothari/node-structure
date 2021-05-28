import { gql } from 'apollo-server-express';
import roleTypeDefs from './role.typedef';
import userTypeDefs from './user.typedef';

const baseTypeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION
  type Query
  type Mutation
  scalar DateTime
`;

export const typeDefs = [baseTypeDefs, roleTypeDefs, userTypeDefs];
