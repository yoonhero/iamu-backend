import { Resolvers } from "../../types"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async(_, {username, password}, {client}) => {
      // find user with username 
      const user = await client.user.findFirst({where : {username: username}})
      if (!user) {
        return {
          ok: false,
          error: "User not found"
        }
      }

      // check hashed password is same with DB Val
      const passwordOK = await bcrypt.compare(password, user.password)
      if(!passwordOK) {
        return {
          ok: false,
          error: "Incorrect Password, Please Check Again"
        }
      }

      // make a token 
      const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY)
      return {
        ok: true, 
        token,
      }
    }
  }
}

export default resolvers