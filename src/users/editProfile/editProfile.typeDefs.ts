import { gql } from "apollo-server";

export default gql`
  scalar FileUpload

  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      password: String
      email: String
      bio: String
      avatar: FileUpload
    ): MutationResponse!
  }
`;
