import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Student } from '../database/shemas/person';

export default function routes(router: Router): void {
  router.get('/students', (request, response) => {
    const regex = new RegExp( request.query.filter, 'i');
    const params = { $regex: regex };

    Student
      .find()
      .or([
        { firstName: params },
        { lastName: params },
        { address: params },
        { description: params }
      ])
      .exec()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.get('/students/:id', (request, response) => {

    Student.findById(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.post('/students', (request, response) => {
    delete request.body._id;
    const student: Document = new Student(request.body);

    student.save()
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.delete('/students/:id', (request, response) => {

    Student.findByIdAndDelete(request.params.id)
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });

  router.put('/students/:id', (request, response) => {
    Student.findByIdAndUpdate(request.params.id, request.body, {new: true})
      .then(data => response.send(data))
      .catch(err => response.send(err));
  });
}
