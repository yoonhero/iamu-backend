import { Movie } from "@prisma/client"
import client from "./client"

type Context = {
  loggedInUser?: Movie;
  client?: client;
}
// client?: client; 

export type Resolver = (root:any, args:any, context:Context, info:any) => any 

export type Resolvers = {
  [key:string]: {
    [key: string] : Resolver
  }
}