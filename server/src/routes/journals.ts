import { Router } from 'express';
import { Journal } from '../database/shemas/journals';

export default function routes(router: Router): void {
  router.get('/journals', (request, response) => {

  Journal.find()
    .then(data => response.send(data))
    .catch(err => response.send(err));
  });

  router.get('/journals/:id', (request, response) => {

    Journal.findOne({ 'subject._id': request.params.id})
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.put('/journals', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }

    Journal.findByIdAndUpdate(request.params.id, request.body, {new: true})
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
