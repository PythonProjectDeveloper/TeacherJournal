import express from 'express';
import { config } from '../environments';
import initMiddlewares from './middleware';

export function initServer(): void {
  const server: any = express();

  initMiddlewares(server);

  server.listen(config.port, () => {
    console.log('We are live on ' + config.port);
  });

  return server;
}
