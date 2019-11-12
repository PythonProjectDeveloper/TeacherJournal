import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Subject } from '../database/shemas/subject';

export default function routes(router: Router): void {
  router.get('/subjects', (request, response) => {

    Subject.find()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/subjects/:id', (request, response) => {

    Subject.findById(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.post('/subjects', (request, response) => {
    delete request.body._id;
    const subject: Document = new Subject(request.body);

    subject.save()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.delete('/subjects/:id', (request, response) => {
    Subject.findByIdAndDelete(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.put('/subjects/:id', (request, response) => {
    Subject.findByIdAndUpdate(request.params.id, request.body, {new: true})
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
