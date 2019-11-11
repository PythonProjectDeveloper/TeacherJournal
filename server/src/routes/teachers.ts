import { Router } from 'express-serve-static-core';
import { Document } from 'mongoose';
import { Teacher } from '../database/shemas/person';

export default function routes(router: Router): void {
  router.get('/teachers', (request, response) => {

      Teacher.find((err, teachers) => {
          const data: any = err ? {'error': 'An error has occurred'} : teachers;

          response.send(data);
      });
  });

  router.get('/teachers/:id', (request, response) => {

    Teacher.findById(request.params.id, (err, teacher) => {
      const data: any = err ? {'error': 'An error has occurred'} : teacher;

      response.send(data);
    });
  });

  router.post('/teachers', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }

    const teacher: Document = new Teacher(request.body);

    teacher.save((err) => {
      const data: any = err ? {'error': 'An error has occurred'} : teacher;

      response.send(data);
    });
  });

  router.delete('/teachers/:id', (request, response) => {
    Teacher.findByIdAndDelete(request.params.id, (err, teacher) => {
      const data: any = err ? {'error': 'An error has occurred'} : teacher;

      response.send(data);
    });
  });

  router.put('/teachers', (request, response) => {

    if (!request.body) { return response.sendStatus(400); }

    Teacher.findByIdAndUpdate(request.body.id, request.body, {new: true}, (err, teacher) => {
      const data: any = err ? {'error': 'An error has occurred'} : teacher;

      response.send(data);
    });
  });
}
