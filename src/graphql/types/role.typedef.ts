import { gql } from 'apollo-server-express';

export default gql`
  type Role {
    id: ID!
    name: String!
    permissions: [Permission]
  }

  type Permission {
    id: ID!
    name: String!
  }

  extend type Query {
    getRoles: [Role!]!
  }
`;
