import { Resolvers } from "../../types";
const { authenticateFacebook, authenticateGoogle } = require("./passport");
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    authFacebook: async (
      _,
      { input: { accessToken } },
      { req, res, client }
    ) => {
      req.body = {
        ...req.body,
        access_token: accessToken,
      };
      try {
        // data contains the accessToken, refreshToken and profile from passport
        const { data, info } = await authenticateFacebook(req, res);

        // if authenicate success
        if (data) {
          const {
            accessToken,
            profile: { displayName, _json },
          } = data;

          // check if username or email are already on DB.
          const existingUser = await client.user.findFirst({
            where: {
              OR: [
                {
                  username: displayName,
                },
                {
                  email: _json.email,
                },
              ],
            },
          });

          // if user exist
          if (existingUser) {
            return {
              error: "This username/email is already taken.",
              ok: false,
            };
          }

          // hash password
          // save password like original text "1234"
          // this will be punished by the police
          const uglyPassword = await bcrypt.hash(accessToken, 10);

          // create new User
          await client.user.create({
            data: {
              username: displayName,
              email: _json?.email,
              firstName: _json?.firstName ? _json?.firstName : displayName,
              lastName: _json?.lastName,
              password: uglyPassword,
              activate: false,
            },
          });

          return {
            ok: true,
          };
        }

        if (info) {
          switch (info.code) {
            case "ETIMEDOUT":
              return {
                ok: false,
                error: "Can't reach to FaceBook.",
              };
            default:
              return {
                ok: false,
                error: "Internal Server Problem...",
              };
          }
        }
        return {
          ok: false,
          error: "Internal Server Problem...",
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
    authGoogle: async (_, { input: { accessToken } }, { req, res, client }) => {
      req.body = {
        ...req.body,
        access_token: accessToken,
      };

      try {
        // data contains the accessToken, refreshToken and profile from passport
        const { data, info } = await authenticateGoogle(req, res);

        if (data) {
          const {
            accessToken,
            profile: { displayName, _json },
          } = data;
          // check if username or email are already on DB.
          const existingUser = await client.user.findFirst({
            where: {
              OR: [
                {
                  username: displayName,
                },
                {
                  email: _json.email,
                },
              ],
            },
          });

          // if user exist
          if (existingUser) {
            return {
              error: "This username/email is already taken.",
              ok: false,
            };
          }

          // hash password
          // save password like original text "1234"
          // this will be punished by the police
          const uglyPassword = await bcrypt.hash(accessToken, 10);

          // create new User
          await client.user.create({
            data: {
              username: displayName,
              email: _json?.email,
              firstName: _json?.firstName ? _json?.firstName : displayName,
              lastName: _json?.lastName,
              password: uglyPassword,
              activate: false,
            },
          });

          return {
            ok: true,
          };
        }

        if (info) {
          console.log(info);
          switch (info.code) {
            case "ETIMEDOUT":
              return {
                ok: false,
                error: "Can't reach to Google...",
              };
            default:
              return {
                ok: false,
                error: "Internal Server Problem...",
              };
          }
        }
        return {
          ok: false,
          error: "Internal Server Problem...",
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};

export default resolvers;
