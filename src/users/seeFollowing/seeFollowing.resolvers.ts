import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, page }, { client }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const following = await client.user
        .findUnique({
          where: { username },
        })
        .following({
          take: 5,
          skip: (page - 1) * 5,
        });

      return {
        ok: true,
        following,
      };
    },
  },
};

export default resolvers;
