import {gql} from "apollo-server"

export default gql`
  type Mutation {
    verificateEmail(hashedText: String): MutationResponse
  }
`