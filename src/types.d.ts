import { Movie } from "@prisma/client"


type Context = {
  loggedInUser?: Movie;
}
// client?: client; 

export type Resolver = (root:any, args:any, context:Context, info:any) => any 

export type Resolvers = {
  [key:string]: {
    [key: string] : Resolver
  }
}