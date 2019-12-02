import { Router } from 'express';
import { Log } from '../database/shema-models/log';

export default function routes(router: Router): void {
  router.post('/logs', (request, response) => {
    const log = new Log(request.body);

    log.save()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
