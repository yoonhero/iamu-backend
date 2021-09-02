import { gql } from "apollo-server";

module.exports = gql`
  type AuthResponse {
    token: String
    name: String
  }
  input AuthInput {
    accessToken: String!
  }
  type Mutation {
    authFacebook(input: AuthInput!): AuthResponse
    authGoogle(input: AuthInput!): AuthResponse
  }
`;
