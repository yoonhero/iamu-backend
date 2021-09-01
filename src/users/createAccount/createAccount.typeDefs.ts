import { gql } from "apollo-server";

// createAccount Arguments and Return Val 
export default gql`
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): MutationResponse
  }
`