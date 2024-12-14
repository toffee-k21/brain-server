import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { users } from './users';
import { prismaClient } from './client/db';

export default async function graphqlServer() {

const app = express();
prismaClient;

const server = new ApolloServer({
  typeDefs:`

  type Query {
   ${users.queries}
}`,
  resolvers: {
    Query:{
    ...users.resolvers.queries}
  },
});

await server.start();

app.use('/graphql',express.json(),expressMiddleware(server));
return app;
}