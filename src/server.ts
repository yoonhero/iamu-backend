import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    title: String!
    year: Int!
    id: Int!
    genre: String 
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre:String): Movie
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: () => ({ title: "Hello", year: 2021 }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) => client.movie.create({data: { title, year, genre}}),
    deleteMovie: (_, args) => {
      console.log(args);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({req}) => {
    return {
      client: client 
    }
  }
});

server
  .listen()
  .then(() => console.log("Server is running on http://localhost:4000/"));
