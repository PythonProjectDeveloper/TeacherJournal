import { Router } from 'express';
import { removeEmptyId } from '../helpers/calculation';
import { Journal } from '../database/shema-models/journal';

export default function routes(router: Router): void {
  router.get('/journals', (request, response) => {

  Journal.find()
    .then(data => response.send(data))
    .catch(err => response.send(err));
  });

  router.get('/journals/:id', (request, response) => {

    Journal.findOne({ subject: request.params.id})
      .populate('subject students')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.put('/journals/:id', (request, response) => {
    const journal = removeEmptyId(request.body);

    Journal.findByIdAndUpdate(request.params.id, journal, {new: true})
      .populate('subject students')
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
