
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

// load al *.resolvers.ts and *.typeDefs.ts
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`)

// merge and export that
export const typeDefs = mergeTypeDefs(loadedTypes)
export const resolvers = mergeResolvers(loadedResolvers)