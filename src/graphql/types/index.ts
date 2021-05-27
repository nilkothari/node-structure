import { gql } from 'apollo-server-express';
import roleTypeDefs from './role.typedef';
// import userTypeDefs from './user';

const baseTypeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION

  type Query
`;

export const typeDefs = [baseTypeDefs, roleTypeDefs];
