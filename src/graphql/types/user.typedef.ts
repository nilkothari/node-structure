import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
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

  input SignupInput {
    name: String!
    email: String!
    password: String!
    roleId: String!
  }

  extend type Query {
    getUsers: [User!]!
    getUserByEmail(email: String!): User!
    getUserById(id: String!): User!
  }

  extend type Mutation {
    checkEmailAvailability(email: String!): Boolean!
    signUp(signupInput: SignupInput): User!
    login(email: String!, password: String!): AuthResponse!
  }
`;
