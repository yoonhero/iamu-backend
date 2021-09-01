require("dotenv").config()
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./client";
import schema from "./schema"

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({req}) => {
    return {
      client: client
    }
  }
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Great Flight is running on http://localhost:${PORT}/`));
