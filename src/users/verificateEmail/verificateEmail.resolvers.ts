import {Resolvers} from "../../types"
import hash from "object-hash"
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    verificateEmail: protectedResolver( async(_, {hashedText}, {client, loggedInUser}) => {
      const hashedUsername = await hash(loggedInUser.username);
      if(hashedUsername === hashedText) {
        client.user.update({
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