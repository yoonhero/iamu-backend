import {  PrismaClient } from "@prisma/client"

// loggedInUser?: Movie;
type Context = {
  client?: PrismaClient;
}
// client?: client; 

export type Resolver = (root:any, args:any, context:Context, info:any) => any 

export type Resolvers = {
  [key:string]: {
    [key: string] : Resolver
  }
}