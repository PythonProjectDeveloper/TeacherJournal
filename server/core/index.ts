import express from 'express';
import { config } from 'environments';
import { MongoClient } from 'mongodb';
import initMiddlewares from './middleware';

export function initServer(database: MongoClient): void {
  const server: any = express();

  initMiddlewares(server, database);

  server.listen(config.port, () => {
    console.log('We are live on ' + config.port);
  });

  return server;
}
