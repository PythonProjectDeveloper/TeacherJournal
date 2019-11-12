import { Router } from 'express';
import { Document } from 'mongoose';
import { Log } from '../database/shemas/log';

export default function routes(router: Router): void {
  router.post('/logs', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }

    const log: Document = new Log(request.body);

    log.save()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
