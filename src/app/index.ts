import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { PrismaClient } from '@prisma/client'

export default async function graphqlServer() {

const app = express();

const prisma = new PrismaClient()
const newUser = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
})

const server = new ApolloServer({
  typeDefs:`
    type Query {
    hello: String
  }`,
  resolvers: {},
});

await server.start();

app.use('/graphql',express.json(),expressMiddleware(server));
return app;
}