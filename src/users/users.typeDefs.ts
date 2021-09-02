import { gql } from "apollo-server";

// global type User 
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    isMe: Boolean!
    activate: Boolean!
  }
`;