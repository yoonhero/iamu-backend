import {Resolvers} from "../../types"

// search users by keyword and load 30 
const resolvers: Resolvers = {
  Query: {
    searchUsers: async(_, {keyword, offset=1}, {client}) => {
      const users = await client.user.findMany({
        where: {
          username: {
            contains: keyword.toLowerCase(),
          }
        },
        skip: (offset-1)*30,
        take: 30,
      })
      return users 
    }
  }
}

export default resolvers