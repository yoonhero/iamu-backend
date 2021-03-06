import { gql } from "apollo-server";

export default gql`
  type AuthResponse {
    ok: Boolean
    error: String
  }
  input AuthInput {
    accessToken: String!
  }
  type Mutation {
    authFacebook(input: AuthInput!): AuthResponse
    authGoogle(input: AuthInput!): AuthResponse
  }
`;
