import { gql } from "apollo-server";

// query seeProfile get username and return User Info 
export default gql`
    type Query{
        seeProfile(username:String!):User
    }
`;