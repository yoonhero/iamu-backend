import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        // if user exist
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }

        // hash password
        // save password like original text "1234"
        // this will be punished by the police
        const uglyPassword = await bcrypt.hash(password, 10);

        // create new User
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
            activate: false,
          },
        });

        // save and return user
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create account.",
        };
      }
    },
  },
};

export default resolvers;
