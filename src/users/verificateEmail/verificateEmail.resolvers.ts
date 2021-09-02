import {Resolvers} from "../../types"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    verificateEmail: protectedResolver( async(_, {hash}, {client, loggedInUser}) => {
      const hashedUsername = await bcrypt.hash(loggedInUser.username, 10);
      if(hashedUsername === hash) {
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