import express from 'express';
import routes from '../routes';
import cors from 'cors';

export default function initMiddlewares(server: any): void {
  server.use(cors());
  server.use(express.json());
  server.use('/api', routes());
}
