import {PrismaClient} from "@prisma/client"

// prisma client which uses many things to manipulate server
const client = new PrismaClient();

export default client;