import {loadFilesSync, mergeResolvers, mergeTypeDefs, makeExecutableSchema} from "graphql-tools"

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries, mutations}.ts`)
const typeDefs = mergeTypeDefs(loadedTypes)
const resolvers = mergeResolvers(loadedResolvers)

const schema = makeExecutableSchema({typeDefs, resolvers})

export default schema