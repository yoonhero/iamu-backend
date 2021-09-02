import { Resolvers } from "../../types";
const { authenticateFacebook, authenticateGoogle } = require("./passport");

const resolvers: Resolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
    authFacebook: async (_, { input: { accessToken } }, { req, res }) => {
      req.body = {
        ...req.body,
        access_token: accessToken,
      };

      try {
        // data contains the accessToken, refreshToken and profile from passport
        const { data, info } = await authenticateFacebook(req, res);

        if (data) {
          console.log(data);

          // if (user) {
          //   return ({
          //     name: user.name,
          //     token: user.generateJWT(),
          //   });
          // }
        }

        if (info) {
          console.log(info);
          switch (info.code) {
            case "ETIMEDOUT":
              return new Error("Failed to reach Facebook: Try Again");
            default:
              return new Error("something went wrong");
          }
        }
        return Error("server error");
      } catch (error) {
        return error;
      }
    },
    authGoogle: async (_, { input: { accessToken } }, { req, res }) => {
      req.body = {
        ...req.body,
        access_token: accessToken,
      };

      try {
        // data contains the accessToken, refreshToken and profile from passport
        const { data, info } = await authenticateGoogle(req, res);

        if (data) {
          console.log(data);
          // if (user) {
          //   return ({
          //     name: user.name,
          //     token: user.generateJWT(),
          //   });
          // }
        }

        if (info) {
          console.log(info);
          switch (info.code) {
            case "ETIMEDOUT":
              return new Error("Failed to reach Google: Try Again");
            default:
              return new Error("something went wrong");
          }
        }
        return Error("server error");
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
