import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Teacher } from '../database/shemas/person';

export default function routes(router: Router): void {
  router.get('/teachers', (request, response) => {

    Teacher.find()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/teachers/:id', (request, response) => {

    Teacher.findById(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.post('/teachers', (request, response) => {
    delete request.body._id;
    const teacher: Document = new Teacher(request.body);

    teacher.save()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.delete('/teachers/:id', (request, response) => {
    Teacher.findByIdAndDelete(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.put('/teachers/:id', (request, response) => {
    Teacher.findByIdAndUpdate(request.params.id, request.body, {new: true})
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
