import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';

export default async function graphqlServer() {

const app = express();


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