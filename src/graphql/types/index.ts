import { gql } from 'apollo-server-express';
import roleTypeDefs from './role';
// import userTypeDefs from './user';

const baseTypeDefs = gql`
  type Query
`;

export const typeDefs = [baseTypeDefs, roleTypeDefs];
