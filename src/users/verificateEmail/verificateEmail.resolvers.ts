import { Resolvers } from "../../types";

// email verification
const resolvers: Resolvers = {
  Mutation: {
    verificateEmail: async (
      _,
      { hashedText }: { hashedText: string },
      { client }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          activateCode: hashedText,
        },
      });

      if (existingUser) {
        // set activate item to true
        await client.user.update({
          where: {
            activateCode: hashedText,
          },
          data: { activate: true },
        });

        return {
          ok: true,
        };
      }
      return {
        ok: false,
        error: "Can't verificate email. Please Try Again",
      };
    },
  },
};

export default resolvers;
