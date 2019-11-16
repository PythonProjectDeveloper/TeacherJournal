import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Subject } from '../database/shemas/subject';

export default function routes(router: Router): void {
  router.get('/subjects', (request, response) => {

    const regex = new RegExp( request.query.filter, 'i');
    const params = { $regex: regex };

    Subject
      .find()
      .or([
        { name: params },
        { cabinet: params },
        { description: params }
      ])
      .exec()
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
    const subject = new Subject(request.body);

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
