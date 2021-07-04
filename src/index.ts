import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema, Query, Resolver } from 'type-graphql';

@Resolver()
class hello {
  @Query(() => String)
  hello(): string {
    return 'world';
  }
}

const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [hello],
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app, path: '/api/graphql' });

  app.listen(4000, () =>
    console.log('server started at http://localhost:4000/api/graphql')
  );
};

main().catch((e) => console.log(e));
