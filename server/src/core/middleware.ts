import express from 'express';
import routes from '../routes';

export default function initMiddlewares(server: any): void {
  server.use(express.json());
  server.use('/api', routes());
}
