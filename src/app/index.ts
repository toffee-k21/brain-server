import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { users } from './users';

export default async function graphqlServer() {
// console.log(users)
const app = express();

// const prisma = new PrismaClient()
// const newUser = await prisma.user.create({
//   data: {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//   },
// })

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