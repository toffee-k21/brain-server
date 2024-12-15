import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';
import { users } from './users';
import { prismaClient } from './client/db';
import cors from 'cors';
import JWTService from './services/jwt';


export default async function graphqlServer() {
  const app = express();
  app.use(cors());
prismaClient;


const server = new ApolloServer({
  typeDefs:`
  ${users.types}

  type Query {
   ${users.queries}
}`,
  resolvers: {
    Query:{
    ...users.resolvers.queries}
  },
});

await server.start();

app.use('/graphql',
  express.json(),
  expressMiddleware(server,
    {context:async({req,res})=>{
  return {
    user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization) : null
  }
  }}));
return app;
}