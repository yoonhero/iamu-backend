import { ApolloServer, gql } from "apollo-server";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const typeDefs = gql`
  type Movie {
    title: String 
    year: Int
    id: Int 
  }
type Query {
  movies: [Movie]
  movie: Movie
}
type Mutation {
  createMovie(title: String!):Boolean
  deleteMovie(title: String!): Boolean
}

`

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: "Hello", year: 2021 }),
  },
  Mutation: {
    createMovie: (_, { title }) => {
      console.log(title)
      return true
    },
    deleteMovie: (_, args) => {
      console.log(args)
      return true
    }
  }

}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});


server.listen().then(() => console.log("Server is running on http://localhost:4000/"))