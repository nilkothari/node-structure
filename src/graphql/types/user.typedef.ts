import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String
    email: String!
  }

  type Profile {
    id: ID!
    role: Role
  }

  type AuthResponse {
    userId: String!
    accessToken: String!
    refreshToken: String!
  }

  extend type Query {
    getUsers: [User!]!
    getUserByEmail(email: String!): User!
    getUserById(id: String!): User!
  }

  extend type Mutation {
    signUp(): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
  }

  scalar DateTime
`;
