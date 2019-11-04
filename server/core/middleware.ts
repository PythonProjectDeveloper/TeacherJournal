import express from 'express';
import routes from 'routes';
import { MongoClient } from 'mongodb';

export default function initMiddlewares(server: any, database: MongoClient): void {
  server.use(express.json());
  server.use('/api', routes(database));
}
