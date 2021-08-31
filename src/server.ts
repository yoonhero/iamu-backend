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
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre:String): Movie
    deleteMovie(id: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, {id}) => client.movie.findUnique({where:{id}}) ,
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) => client.movie.create({data: { title, year, genre}}),
    deleteMovie: (_, {id}) => client.movie.delete({where:{id}})
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
