import {Resolvers} from "../../types"
import hash from "object-hash"
import { protectedResolver } from "../users.utils";

// email verification 
const resolvers: Resolvers = {
  Mutation: {
    verificateEmail: protectedResolver( async(_, {hashedText}, {client, loggedInUser}) => {
      // hashing the existing user's useranem
      const hashedUsername = await hash(loggedInUser.username);

      // if same
      if(hashedUsername === hashedText) {
        // set activate item to true 
        await client.user.update({
          where: {username: loggedInUser.username},
          data: {activate: true}
        })

        return {
          ok: true,
        }
      }
      return {
        ok: false, 
        error: "Can't verificate email. Please Try Again"
      }
    })
  }
};

export default resolvers