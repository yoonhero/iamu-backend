require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import express from "express";
import logger from "morgan";
import http from "http";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  // new apollo server
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    context: async (ctx) => {
      if (ctx.req) {
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
          client,
          req: ctx.req,
          res: ctx.res,
        };
      }
    },
  });

  const PORT = process.env.PORT;

  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());

  // start server and apply app middleware
  await apollo.start();
  apollo.applyMiddleware({ app });

  // set upload folder
  app.use("/static", express.static("uploads"));
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(
    `🚀 Great Flight is running on http://localhost:${PORT}${apollo.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
