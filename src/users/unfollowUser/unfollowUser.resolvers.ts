import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { client, loggedInUser }) => {
        // if to follow user does not exists
        const ok = client.user.findUnique({
          where: { username },
        });

        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow User",
          };
        }

        // update connection
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
