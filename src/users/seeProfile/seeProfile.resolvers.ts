import { Resolvers } from "../../types"

const resolvers:Resolvers = {
    Query: {
      // .findUnique find specific Val using where 
        seeProfile: (_, { username }, { client}) => client.user.findUnique({
            where: {
                username,
            },
            // include all follower and following User
            include: {
                following: true,
                followers: true,
            }
        }),
    },
};

export default resolvers 