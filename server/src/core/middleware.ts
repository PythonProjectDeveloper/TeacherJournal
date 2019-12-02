import express from 'express';
import routes from '../routes';
import cors from 'cors';
import url from 'url';
import { connected, termination } from '../constants/term-color';

export default function initMiddlewares(server: any): void {
  server.use(cors());
  server.use(express.json());
  server.use(urlLogger);
  server.use('/api', routes());
}

export function urlLogger(req, res, next) {
  const requestUrl = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });

  console.log(
    termination(req.method),
    connected(requestUrl)
  );

  next();
}
